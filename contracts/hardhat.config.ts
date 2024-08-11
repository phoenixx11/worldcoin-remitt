import { HardhatUserConfig } from "hardhat/config";
//import "@nomicfoundation/hardhat-ethers";
//import "@nomicfoundation/hardhat-toolbox";
//import "@nomiclabs/hardhat-etherscan";
//import "@nomadiclabs/waffle";
import * as dotenv from "dotenv";

dotenv.config();
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    optimism: {
      url: process.env.L2_RPC_URL,
      accounts: [process.env.PRIVATE_KEY || ''], 
    },
    mode: {
      url: "MODE_TESTNET_URL", 
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
}


export default config;






