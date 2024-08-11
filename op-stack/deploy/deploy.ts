import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

const deployContracts = async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://your-l2-network-rpc-url');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);

  const GasPriceOracle = await ethers.getContractFactory('GasPriceOracle', wallet);
  const gasPriceOracle = await GasPriceOracle.deploy('priceFeedAddress');
  await gasPriceOracle.deployed();
  console.log(`GasPriceOracle deployed to: ${gasPriceOracle.address}`);

  const GasSubsidy = await ethers.getContractFactory('GasSubsidy', wallet);
  const gasSubsidy = await GasSubsidy.deploy();
  await gasSubsidy.deployed();
  console.log(`GasSubsidy deployed to: ${gasSubsidy.address}`);

  const config = {
    gasPriceOracleAddress: gasPriceOracle.address,
    gasSubsidyAddress: gasSubsidy.address,
  };
  fs.writeFileSync(path.join(__dirname, 'deploy-config.json'), JSON.stringify(config, null, 2));
};

deployContracts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
