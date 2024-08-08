import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};

module.exports = {
  solidity: "0.8.24",
  networks: {
    optimism: {
      url: process.env.L2_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

export default config;

