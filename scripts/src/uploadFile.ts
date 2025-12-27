import { PinataSDK } from "pinata";
import fs from "node:fs";
import crypto from "node:crypto";

import { env } from "./config";

const pinata = new PinataSDK({
  pinataJwt: env.PINATA_JWT_TOKEN,
  pinataGateway: env.PINATA_GATEWAY,
});

const fileBuffer = fs.readFileSync("./assets/cat.jpg");
const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
const encryptedBuffer = Buffer.concat([
  cipher.update(Buffer.from(fileBuffer)),
  cipher.final(),
]);

const blob = new Blob([encryptedBuffer]);
const file = new File([blob], "cat.jpg", { type: "image/jpg" });
const upload = await pinata.upload.public.file(file);
console.log(upload);
