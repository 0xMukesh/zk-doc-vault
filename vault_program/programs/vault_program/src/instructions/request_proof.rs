// use anchor_lang::prelude::*;
// use anchor_lang::solana_program;
// use anchor_lang::solana_program::program::invoke;
// use bonsol_interface::bonsol_schema::InputType;
// use bonsol_interface::instructions::{execute_v1, CallbackConfig, ExecutionConfig, InputRef};

// use crate::constants;
// use crate::errors::ErrorCode;
// use crate::state::Vault;

// #[derive(Accounts)]
// pub struct RequestProof<'info> {
//     #[account(mut)]
//     pub user: Signer<'info>,

//     #[account(
//       seeds = [b"vault", user.key().as_ref(), vault.vault_id.as_ref()],
//       bump = vault.bump,
//       constraint = vault.owner == user.key() @ ErrorCode::InvalidVaultOwner
//     )]
//     pub vault: Account<'info, Vault>,
// }

// #[derive(AnchorSerialize, AnchorDeserialize)]
// pub struct ProofInputs {
//     pub vault_address: Pubkey,
//     pub ownership_commitment: [u8; 32],
//     pub encrypted_k_doc: Vec<u8>,
//     pub nullifier: [u8; 32],
// }

// pub fn process_request_proof(
//     ctx: Context<RequestProof>,
//     execution_id: String,
//     proof_inputs: ProofInputs,
// ) -> Result<()> {
//     let vault = &mut ctx.accounts.vault;
//     let user = &ctx.accounts.user;
//     let clock = Clock::get()?;

//     require!(!vault.pending_verification, ErrorCode::VerificationPending);

//     let public_inputs = vec![
//         proof_inputs.vault_address.to_bytes().to_vec(),
//         proof_inputs.ownership_commitment.to_vec(),
//         proof_inputs.encrypted_k_doc,
//         proof_inputs.nullifier.to_vec(),
//     ];

//     let input_refs: Vec<InputRef> = public_inputs
//         .iter()
//         .map(|data| InputRef {
//             input_type: InputType::PublicData,
//             data: &data,
//         })
//         .collect();

//     let execution_config = ExecutionConfig {
//         verify_input_hash: true,
//         input_hash: None,
//         forward_output: true,
//     };

//     let callback_config = Some(CallbackConfig {
//         program_id: crate::ID,
//         instruction_prefix: vec![0],
//         extra_accounts: vec![solana_program::instruction::AccountMeta::new(
//             vault.key(),
//             false,
//         )],
//     });

//     let expiration = clock.slot + 100;

//     let bonsol_ixn = execute_v1(
//         user.key,
//         user.key,
//         constants::ZK_IMAGE_ID,
//         execution_id.as_str(),
//         input_refs,
//         1000,
//         expiration,
//         execution_config,
//         callback_config,
//         None,
//         vec![],
//     )
//     .map_err(|_| ErrorCode::InvalidBonsolInstructionData)?;

//     invoke(&bonsol_ixn, ctx.remaining_accounts)?;

//     Ok(())
// }
