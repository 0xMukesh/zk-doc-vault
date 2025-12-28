#![no_main]

use risc0_zkvm::guest::env;

risc0_zkvm::guest::entry!(main);

fn main() {
    // 1. Read public input (JSON string)
    let public_input: String = env::read();

    // 2. Read private input (attestation string)
    let private_input: String = env::read();

    // 3. Validate and process inputs
    let valid = gjson::valid(&public_input);
    let mut res: u8 = 0;

    if valid {
        let val = gjson::get(&public_input, "attestation");
        if val.kind() == gjson::Kind::String && val.str() == private_input {
            res = 1;
        }
    }

    // 4. Commit the result
    env::commit(&res);
}
