use anchor_lang::prelude::*;

use crate::state::Vault;

#[derive(Accounts)]
#[instruction(vault_id: Pubkey)]
pub struct CreateUserVault<'info> {
    #[account(
        init,
        payer = user,   
        space = 8 + Vault::INIT_SPACE,
        seeds = [b"vault", user.key().as_ref(), vault_id.as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>
}

pub fn process_create_user_vault(ctx: Context<CreateUserVault>, vault_id: Pubkey, name: String) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    let clock = Clock::get()?;

    vault.vault_id = vault_id;
    vault.owner = ctx.accounts.user.key();
    vault.name = name;
    vault.document_count = 0;
    vault.created_at = clock.unix_timestamp;
    vault.updated_at = clock.unix_timestamp;
    vault.bump = ctx.bumps.vault;
    
    Ok(())
}
