import { extendEnvironment, HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import path from "path";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
import { BaseContract, ContractFactory } from "ethers";
dotenv.config({path: path.resolve(__dirname, ".env")});
const { PRIVATE_KEY, API_KEY, API_ARBITRUM_KEY, API_BSC_KEY, PRIVATE_KEY_MAINNET, API_POLYGON_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: JSON.parse(process.env.OPTIMISE || "false"),
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 56,
      initialDate: "2023-10-27T09:00:00",
      accounts: {
        mnemonic: "ticket debris burger express reunion make hood icon exotic enemy pass sweet"
      }
    },
    bscTestnet: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [`${PRIVATE_KEY}`],
      gasPrice: 2000000000,
    },
    bsc: {
      url: "https://bsc-dataseed.bnbchain.org",
      accounts: [`${PRIVATE_KEY_MAINNET}`]
    },
    sepolia: {
      chainId: 11155111,
      url: "https://sepolia.infura.io",
      accounts: [`${PRIVATE_KEY}`],
    },
    ethereum: {
      chainId: 1,
      url: "https://mainnet.infura.io",
      accounts: [`${PRIVATE_KEY_MAINNET}`]
    },
    arbitrumSepolia: {
      chainId: 421614,
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: [`${PRIVATE_KEY}`]
    },
    arbitrum: {
      chainId: 42161,
      url: "https://arbitrum-one.publicnode.com",
      accounts: [`${PRIVATE_KEY_MAINNET}`]
    },
    polygonMumbai: {
      chainId: 80001,
      url: "https://polygon-mumbai.infura.io",
      accounts: [`${PRIVATE_KEY}`]
    },
    polygon: {
      chainId: 137,
      url: "https://polygon-mainnet.infura.io",
      accounts: [`${PRIVATE_KEY_MAINNET}`]
    }
  },
  etherscan: {
    apiKey: {
      "sepolia": `${API_KEY}`,
      "ethereum": `${API_KEY}`,
      "mainnet": `${API_KEY}`,
      "bscTestnet": `${API_BSC_KEY}`,
      "arbitrumOne": `${API_ARBITRUM_KEY}`,
      "arbitrumSepolia": `${API_ARBITRUM_KEY}`,
      "polygon": `${API_POLYGON_KEY}`,
      "polygonMumbai": `${API_POLYGON_KEY}`,
      "bsc": `${API_BSC_KEY}`,
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/"
        }
      },
      {
        network: "ethereum",
        chainId: 1,
        urls: {
          apiURL: "https://api.etherscan.io/api",
          browserURL: "https://etherscan.io"
        }
      }
    ]
  }
};

extendEnvironment( (hre) => {
  hre["SEPOLIA_CHAIN_ID"] = 11155111;
  hre["BCS_TESTNET_CHAIN_ID"] = 97;
  hre["BCS_CHAIN_ID"] = 56;
  hre["ARBITRUM_SEPOLIA_CHAIN_ID"] = 421614;
  hre["ARBITRUM_CHAIN_ID"] = 42161;
  hre["POLYGON_MUMBAI_CHAIN_ID"] = 80001;
  hre["POLYGON_CHAIN_ID"] = 137;

  console.info(`Connected to network: ${hre.network.name}`);
});

export default config;
