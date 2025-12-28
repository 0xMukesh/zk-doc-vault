# protocol workflow

1. user connects solana compatible wallet, ex. phantom/solfare/backpack
2. user creates a vault by sending a transaction on-chain
3. user selects the file to upload
4. website prompts users to sign a message ("Unlock vault: {vault_address}")
5. derive `K_master` from the signature
6. generate random symmetric key for encrypting the document (`K_doc`)
7. encrypt the file using `K_doc`
8. upload the encrypted file to IPFS
9. generate ZK proof proving the authority of the user without revealing the user's details. the prover in ZK system tries to prove "i own this document without revealing the user's identity"
   - public inputs
     - vault address
     - ownership commitment (hash of `K_master`)
     - encrypted `K_doc`
     - nullifier (to prevent relay attacks)
   - private inputs
     - wallet public key (proves ownership without revealing it on-chain)
     - identity secret (unique secret known only to vault owner)
     - signature (from step 4)
     - `K_master` (derived key)
     - `K_doc` (plaintext document key)
