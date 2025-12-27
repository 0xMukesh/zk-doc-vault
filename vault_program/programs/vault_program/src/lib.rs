use anchor_lang::prelude::*;

pub mod constants;
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
}
