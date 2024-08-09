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

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  networks: {
    optimismGoerli: {
      url: "https://goerli.optimism.io", // Example URL for Optimism Goerli
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Replace with your private key
    },
    // If you're setting up your own OP Stack testnet, include the custom RPC URL here
    customOpStack: {
      url: "https://your-opstack-testnet.rpc.url", // Replace with your OP Stack RPC URL
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
