import { ethers } from "hardhat";
import { ContractFactory, Contract, Signer } from "ethers";

async function main() {
  // Get the deployer account
  const [deployer]: Signer[] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the SimpleLoan contract
  const SimpleLoan: ContractFactory = await ethers.getContractFactory("SimpleLoan");
  const simpleLoan: Contract = await SimpleLoan.deploy();
  await simpleLoan.deployed();
  console.log("SimpleLoan deployed to:", simpleLoan.address);

  // Deploy the GasPriceOracle contract
  const GasPriceOracle: ContractFactory = await ethers.getContractFactory("GasPriceOracle");
  const gasPriceOracle: Contract = await GasPriceOracle.deploy("CHAINLINK_PRICE_FEED_ADDRESS");
  await gasPriceOracle.deployed();
  console.log("GasPriceOracle deployed to:", gasPriceOracle.address);

  // Deploy the GasSubsidy contract
  const GasSubsidy: ContractFactory = await ethers.getContractFactory("GasSubsidy");
  const gasSubsidy: Contract = await GasSubsidy.deploy();
  await gasSubsidy.deployed();
  console.log("GasSubsidy deployed to:", gasSubsidy.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
