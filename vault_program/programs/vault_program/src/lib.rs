use anchor_lang::prelude::*;

pub mod constants;
pub mod instructions;
pub mod state;

declare_id!("uDmj4mV6bSGt43SajwZohAYcrBcdGH1Hyduaf5wEwvh");

#[program]
pub mod vault_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
