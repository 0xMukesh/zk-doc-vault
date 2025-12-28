import { Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { PinataSDK } from "pinata";
import crypto from "node:crypto";
import fs from "node:fs";
import { expect } from "bun:test";

import {
  createCommitment,
  decryptDocKey,
  decryptFile,
  deriveMasterKey,
  encryptDocKey,
  encryptFile,
} from "./utils";
import { VaultProgram } from "../target/types/vault_program";

export const encryptAndUploadDocument = async (
  program: Program<VaultProgram>,
  fileBuffer: Buffer,
  pinata: PinataSDK,
  vault: PublicKey,
  wallet: Keypair,
  pinataGateway: string,
) => {
  const documentId = crypto.randomBytes(32);
  const document = PublicKey.findProgramAddressSync(
    [Buffer.from("document"), wallet.publicKey.toBuffer(), documentId],
    program.programId,
  )[0];

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

  return {
    sig,
    documentId,
    document,
  };
};

export const decryptDocumentAndSave = async (
  program: Program<VaultProgram>,
  document: PublicKey,
  pinataGateway: string,
  vault: PublicKey,
  wallet: Keypair,
  outFilePath: string,
) => {
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

  const recomputedCommitment = createCommitment(kDoc, ipfsCid, nonce, authTag);
  expect(recomputedCommitment).toEqual(commitment);

  const decryptedFileBuffer = decryptFile(encryptedFileBuffer, kDoc);
  fs.writeFileSync(outFilePath, decryptedFileBuffer);

  return decryptedFileBuffer;
};
