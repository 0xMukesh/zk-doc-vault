import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { describe, expect, it } from "bun:test";

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
});
