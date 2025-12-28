use anchor_lang::prelude::*;

use crate::constants::IPFS_CID_LEN;

#[account]
#[derive(InitSpace)]
pub struct Document {
    pub user: Pubkey,
    pub vault: Pubkey,
    pub document_id: [u8; 32],
    pub commitment: [u8; 32],
    #[max_len(IPFS_CID_LEN)]
    pub ipfs_cid: String,
    pub encrypted_kdoc: [u8; 32],
    pub kdoc_nonce: [u8; 12],
    pub kdoc_auth_tag: [u8; 16],
    pub is_verified: bool,
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}
