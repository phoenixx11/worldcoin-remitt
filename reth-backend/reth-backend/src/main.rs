use web3::contract::{Contract, Options};
use web3::types::{Address, U256};
use web3::transports::Http;
use web3::Web3;

#[tokio::main]
async fn main() -> web3::Result<()> {
    // Connect to the Eth network via (Reth node)
    let transport = Http::new("http://127.0.0.1:8545")?;
    let web3 = Web3::new(transport);

    // Smart contract address
    let contract_address: Address = "0xYourContractAddress".parse().unwrap();

    // ABI 
    let contract_abi = include_bytes!(".../contracts/artifacts/contracts/gassubsidywithreth.sol/GasSubsidy.json");
    let contract = Contract::from_json(web3.eth(), contract_address, contract_abi)?;

    
    let user: Address = "0xUserAddress".parse().unwrap();
    let gas_amount: U256 = U256::from(21000);

    // applying a gas subsidy
    let tx = contract
        .call("applyGasSubsidy", (user, gas_amount), None, Options::default())
        .await?;

    println!("Transaction successful: {:?}", tx);

    Ok(())
}

