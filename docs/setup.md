# setup

- install rust (https://rustup.rs/)
- install bun runtime (https://bun.sh/)
- install solana dev tools; which includes solana rust toolchain, anchor and surfpool (https://solana.com/docs/intro/installation)
- restart the shell to apply the changes
- run `solana-keygen new` to generate local wallet, which would be used for testing
- cd to `vault_program` dir
- run `surfpool start` to start a local light weight solana validator using lightSVM
- open a new terminal window and cd to `vault_program` dir
- run `anchor build` and wait until it is done
- run `anchor run test` to run the unit tests
- files which are to be encryption are to be present in `vault_program/tests/assets` dir and their decrypted pair would be present in `vault_program/tests/decrypted` dir
