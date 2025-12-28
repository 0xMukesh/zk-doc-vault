use anchor_lang::prelude::*;

use crate::errors::VaultError;
use crate::state::Document;

#[derive(Accounts)]
pub struct DeleteDocument<'info> {
    #[account(
        mut,
        close = user,
        has_one = user @ VaultError::Unauthorized,
    )]
    pub document: Account<'info, Document>,

    #[account(mut)]
    pub user: Signer<'info>,
}

pub fn process_delete_document(_ctx: Context<DeleteDocument>) -> Result<()> {
    Ok(())
}
