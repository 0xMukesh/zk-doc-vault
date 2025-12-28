import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import crypto from "node:crypto";

export const encryptFile = (fileBuffer: Buffer, kDoc: Buffer) => {
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", kDoc, nonce, {
    authTagLength: 16,
  });

  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);

  const authTag = cipher.getAuthTag();
  return Buffer.concat([nonce, encrypted, authTag]);
};

export const createCommitment = (
  kDoc: Buffer,
  ipfsCid: string,
  nonce: Buffer,
  authTag: Buffer,
) => {
  const hash = crypto.createHash("sha256");
  hash.update(kDoc);
  hash.update(Buffer.from(ipfsCid));
  hash.update(nonce);
  hash.update(authTag);
  return hash.digest();
};

// NOTE: uses Ed25519 signature and HKDF-SHA256 for key derivation
export const deriveMasterKey = (
  vaultAddress: PublicKey,
  userSecretKey: Uint8Array,
) => {
  const message = `Unlock vault: ${vaultAddress.toString()}`;
  const messageBytes = new TextEncoder().encode(message);

  // NOTE: this will be handled by wallet adapter on frontend
  const signature = nacl.sign.detached(messageBytes, userSecretKey);
  const salt = vaultAddress.toBuffer();
  const info = Buffer.from("master-key");

  return Buffer.from(
    crypto.hkdfSync("sha256", Buffer.from(signature), salt, info, 32),
  );
};

export const encryptDocKey = (
  kDoc: Buffer,
  kMaster: Buffer,
  vaultAddress: PublicKey,
) => {
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", kMaster, nonce, {
    authTagLength: 16,
  });

  const aad = vaultAddress.toBuffer();
  cipher.setAAD(aad, {
    plaintextLength: kDoc.length,
  });

  const encrypted = Buffer.concat([cipher.update(kDoc), cipher.final()]);

  const authTag = cipher.getAuthTag();

  // 32 + 12 + 16 bytes
  return {
    encrypted,
    nonce,
    authTag,
  };
};

export const decryptDocKey = (
  encrypted: Buffer,
  nonce: Buffer,
  authTag: Buffer,
  kMaster: Buffer,
  vaultAddress: PublicKey,
) => {
  const decipher = crypto.createDecipheriv("aes-256-gcm", kMaster, nonce, {
    authTagLength: 16,
  });

  const aad = vaultAddress.toBuffer();
  decipher.setAAD(aad, {
    plaintextLength: encrypted.length,
  });

  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};

export const decryptFile = (encryptedBuffer: Buffer, kDoc: Buffer) => {
  const nonce = encryptedBuffer.subarray(0, 12);
  const authTag = encryptedBuffer.subarray(-16);
  const encryptedData = encryptedBuffer.subarray(12, -16);

  const decipher = crypto.createDecipheriv("aes-256-gcm", kDoc, nonce, {
    authTagLength: 16,
  });
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
};
