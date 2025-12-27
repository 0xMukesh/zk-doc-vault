use anchor_lang::prelude::*;

use crate::state::Vault;

#[derive(Accounts)]
pub struct CreateUserVault<'info> {
    #[account(
        init,
        payer = user,   
        space = 8 + Vault::INIT_SPACE,
        seeds = [b"vault", user.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn process_create_user_vault(ctx: Context<CreateUserVault>, name: String) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    let clock = Clock::get()?;

    vault.owner = ctx.accounts.user.key();
    vault.name = name;
    vault.document_count = 0;
    vault.created_at = clock.unix_timestamp;
    vault.updated_at = clock.unix_timestamp;
    vault.bump = ctx.bumps.vault;
    
    Ok(())
}
