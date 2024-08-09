async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);
    
    const GasPriceOracle = await ethers.getContractFactory("GasPriceOracle");
    const gasPriceOracle = await GasPriceOracle.deploy("CHAINLINK_PRICE_FEED_ADDRESS");
    console.log("GasPriceOracle deployed to:", gasPriceOracle.address);
  
    const GasSubsidy = await ethers.getContractFactory("GasSubsidy");
    const gasSubsidy = await GasSubsidy.deploy();
    console.log("GasSubsidy deployed to:", gasSubsidy.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
