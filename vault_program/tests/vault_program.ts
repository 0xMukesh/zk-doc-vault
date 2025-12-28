import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { PinataSDK } from "pinata";
import fs from "node:fs";
import { describe, expect, it } from "bun:test";

import { decryptDocumentAndSave, encryptAndUploadDocument } from "./helpers";

import idl from "../target/idl/vault_program.json";
import type { VaultProgram } from "../target/types/vault_program";

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

  if (!pinataJwtToken) {
    throw new Error("missing pinata jwt token in env vars");
  }
  if (!pinataGateway) {
    throw new Error("missing pinata gateway url in env vars");
  }

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

  it("clear previous decryptions", async () => {
    fs.rmSync("tests/assets/decrypted", {
      recursive: true,
    });

    fs.mkdirSync("tests/assets/decrypted");
  });

  it("upload and decrypt test.txt", async () => {
    const fileBuffer = fs.readFileSync("./tests/assets/original/test.txt");
    const outFilePath = "./tests/assets/decrypted/test.txt";

    const { document } = await encryptAndUploadDocument(
      program,
      fileBuffer,
      pinata,
      vault,
      wallet,
      pinataGateway,
    );

    const decryptedFileBuffer = await decryptDocumentAndSave(
      program,
      document,
      pinataGateway,
      vault,
      wallet,
      outFilePath,
    );

    expect(decryptedFileBuffer.toString()).toBe(fileBuffer.toString());
  });

  it("upload and decrypt cat.jpg", async () => {
    const fileBuffer = fs.readFileSync("./tests/assets/original/cat.jpg");
    const outFilePath = "./tests/assets/decrypted/cat.jpg";

    const { document } = await encryptAndUploadDocument(
      program,
      fileBuffer,
      pinata,
      vault,
      wallet,
      pinataGateway,
    );

    const decryptedFileBuffer = await decryptDocumentAndSave(
      program,
      document,
      pinataGateway,
      vault,
      wallet,
      outFilePath,
    );

    expect(decryptedFileBuffer.toString()).toBe(fileBuffer.toString());
  });
});
