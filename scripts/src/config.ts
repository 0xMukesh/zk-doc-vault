import { cleanEnv, str, url } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
  PINATA_API_KEY: str(),
  PINATA_API_SECRET: str(),
  PINATA_JWT_TOKEN: str(),
  PINATA_GATEWAY: url(),
});
