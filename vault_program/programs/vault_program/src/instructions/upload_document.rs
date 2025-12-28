use anchor_lang::prelude::*;

use crate::{errors::VaultError, state::{Document, Vault}};

#[derive(Accounts)]
#[instruction(document_id: [u8; 32], vault_id: Pubkey)]
pub struct UploadDocument<'info> {
    #[account(
      init, 
      payer = user,
      space = 8 + Document::INIT_SPACE,
      seeds = [b"document", user.key().as_ref(), document_id.as_ref()],
      bump
    )]
    pub document: Account<'info, Document>,

    #[account(
      mut,
      seeds = [b"vault", user.key().as_ref(), vault.vault_id.as_ref()],
      bump = vault.bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn process_upload_document(
    ctx: Context<UploadDocument>, 
    document_id: [u8; 32],
    commitment: [u8; 32], 
    ipfs_cid: String,
    encrypted_kdoc: [u8; 32],
    kdoc_nonce: [u8; 12],
    kdoc_auth_tag: [u8; 16]
) -> Result<()> {
    let document = &mut ctx.accounts.document;
    let vault = &mut ctx.accounts.vault;
    let clock = Clock::get()?;

    document.document_id = document_id;
    document.commitment = commitment;
    document.user = ctx.accounts.user.key();
    document.vault = vault.key();
    document.ipfs_cid = ipfs_cid;
    document.encrypted_kdoc = encrypted_kdoc;
    document.kdoc_nonce = kdoc_nonce;
    document.kdoc_auth_tag = kdoc_auth_tag;
    document.is_verified = true;
    document.created_at = clock.unix_timestamp;
    document.updated_at = clock.unix_timestamp;
    document.bump = ctx.bumps.document;

    vault.document_count = vault.document_count.checked_add(1).ok_or(VaultError::MathOverflow)?;

    Ok(())
}