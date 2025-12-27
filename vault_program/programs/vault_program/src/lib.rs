use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;

declare_id!("uDmj4mV6bSGt43SajwZohAYcrBcdGH1Hyduaf5wEwvh");

#[program]
pub mod vault_program {
    use super::*;

    pub fn create_user_vault(
        ctx: Context<CreateUserVault>,
        vault_id: Pubkey,
        name: String,
    ) -> Result<()> {
        process_create_user_vault(ctx, vault_id, name)
    }

    pub fn request_proof(
        ctx: Context<RequestProof>,
        execution_id: String,
        proof_inputs: ProofInputs,
    ) -> Result<()> {
        process_request_proof(ctx, execution_id, proof_inputs)
    }
}
