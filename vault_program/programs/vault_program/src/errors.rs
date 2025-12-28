use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("verification pending")]
    VerificationPending,
    #[msg("invalid vault owner")]
    InvalidVaultOwner,
    #[msg("invalid bonsol instruction data")]
    InvalidBonsolInstructionData,
}
