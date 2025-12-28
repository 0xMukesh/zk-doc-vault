import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { PinataSDK } from "pinata";
import fs from "node:fs";
import crypto from "node:crypto";
import { describe, expect, it } from "bun:test";

import idl from "../target/idl/vault_program.json";
import type { VaultProgram } from "../target/types/vault_program";
import {
  createCommitment,
  decryptDocKey,
  decryptFile,
  deriveMasterKey,
  encryptDocKey,
  encryptFile,
} from "./utils";

describe("vault program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = new anchor.Program<VaultProgram>(idl, provider);
  const wallet = provider.wallet.payer;

  if (!wallet) {
    throw new Error("failed to extract local wallet");
  }

  const pinataJwtToken = process.env.PINATA_JWT_TOKEN;
  const pinataGateway = process.env.PINATA_GATEWAY;

  const pinata = new PinataSDK({
    pinataJwt: pinataJwtToken,
    pinataGateway: pinataGateway,
  });

  const vaultId = Keypair.generate().publicKey;
  const vault = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), wallet.publicKey.toBuffer(), vaultId.toBuffer()],
    program.programId,
  )[0];
  const vaultName = "test";

  const documentId = crypto.randomBytes(32);
  const document = PublicKey.findProgramAddressSync(
    [Buffer.from("document"), wallet.publicKey.toBuffer(), documentId],
    program.programId,
  )[0];

  it("create vault", async () => {
    const sig = await program.methods
      .createUserVault(vaultId, vaultName)
      .accountsPartial({
        user: wallet.publicKey,
        vault,
        systemProgram: SystemProgram.programId,
      })
      .signers([wallet])
      .rpc();

    console.log(`create vault - ${sig}`);

    const vaultAccountState = await program.account.vault.fetch(vault);

    expect(vaultAccountState.owner.toString()).toBe(
      wallet.publicKey.toString(),
    );
    expect(vaultAccountState.documentCount.toNumber()).toBe(0);
    expect(vaultAccountState.name).toBe(vaultName);
  });

  it("upload document", async () => {
    const fileBuffer = fs.readFileSync("./tests/test.txt");

    const kMaster = deriveMasterKey(vault, wallet.secretKey);
    const kDoc = crypto.randomBytes(32);
    const encryptedFileBuffer = encryptFile(fileBuffer, kDoc);
    const {
      encrypted: encryptedKDoc,
      nonce,
      authTag,
    } = encryptDocKey(kDoc, kMaster, vault);

    const blob = new Blob([encryptedFileBuffer]);
    const file = new File([blob], "test.enc", {
      type: "application/octet-stream",
    });

    const { cid } = await pinata.upload.public.file(file);
    console.log(`uploaded encrypted file to pinata - ${pinataGateway}/${cid}`);

    const commitment = createCommitment(kDoc, cid, nonce, authTag);

    const sig = await program.methods
      .uploadDocument(
        Array.from(documentId),
        Array.from(commitment),
        cid,
        Array.from(encryptedKDoc),
        Array.from(nonce),
        Array.from(authTag),
      )
      .accountsPartial({
        document,
        user: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([wallet])
      .rpc();

    console.log(`upload sig - ${sig}`);

    const documentState = await program.account.document.fetch(document);

    expect(documentState.ipfsCid).toBe(cid);
    expect(Buffer.from(documentState.commitment)).toEqual(commitment);
    expect(Buffer.from(documentState.encryptedKdoc)).toEqual(encryptedKDoc);
    expect(documentState.isVerified).toBe(true);
  });

  it("decrypt document", async () => {
    const documentState = await program.account.document.fetch(document);
    const ipfsCid = documentState.ipfsCid;
    const encryptedKDoc = Buffer.from(documentState.encryptedKdoc);
    const nonce = Buffer.from(documentState.kdocNonce);
    const authTag = Buffer.from(documentState.kdocAuthTag);
    const commitment = Buffer.from(documentState.commitment);

    const fileResponse = await fetch(`${pinataGateway}/ipfs/${ipfsCid}`);
    const encryptedFileBuffer = Buffer.from(await fileResponse.arrayBuffer());

    const kMaster = deriveMasterKey(vault, wallet.secretKey);
    const kDoc = decryptDocKey(encryptedKDoc, nonce, authTag, kMaster, vault);

    const recomputedCommitment = createCommitment(
      kDoc,
      ipfsCid,
      nonce,
      authTag,
    );
    expect(recomputedCommitment).toEqual(commitment);

    const decryptedFileBuffer = decryptFile(encryptedFileBuffer, kDoc);

    console.log(decryptedFileBuffer.toString());
  });
});
