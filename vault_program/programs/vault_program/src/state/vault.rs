use anchor_lang::prelude::*;

use crate::constants::MAX_NAME_LEN;

#[account]
#[derive(InitSpace)]
pub struct Vault {
    pub vault_id: Pubkey,
    pub owner: Pubkey,
    #[max_len(MAX_NAME_LEN)]
    pub name: String,
    pub document_count: u64,
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}
