use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;

declare_id!("AoDNRrocNcANGPWphiAPKPhb6fErigg91veX9b6rqtE9");

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

    pub fn upload_document(
        ctx: Context<UploadDocument>,
        document_id: [u8; 32],
        commitment: [u8; 32],
        ipfs_cid: String,
        encrypted_kdoc: [u8; 32],
        kdoc_nonce: [u8; 12],
        kdoc_auth_tag: [u8; 16],
    ) -> Result<()> {
        process_upload_document(
            ctx,
            document_id,
            commitment,
            ipfs_cid,
            encrypted_kdoc,
            kdoc_nonce,
            kdoc_auth_tag,
        )
    }

    // FIXME: dead code, remove later on
    // bonsol isn't used now, due to some issue with groth16 verifier (not sure)
    // pub fn request_proof(
    //     ctx: Context<RequestProof>,
    //     execution_id: String,
    //     proof_inputs: ProofInputs,
    // ) -> Result<()> {
    //     process_request_proof(ctx, execution_id, proof_inputs)
    // }
}
