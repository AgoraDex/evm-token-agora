import { extendEnvironment, HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import path from "path";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
import { BaseContract, ContractFactory } from "ethers";
dotenv.config({path: path.resolve(__dirname, ".env")});
const { PRIVATE_KEY, API_KEY, API_BSC_KEY, API_ARBITRUM_KEY, PRIVATE_KEY_MAINNET } = process.env;

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
      url: "https://sepolia.infura.io/v3/53d95e4c1b3649a19f83f206226cf482",
      accounts: [`${PRIVATE_KEY}`],
    },
    ethereum: {
      chainId: 1,
      url: "https://mainnet.infura.io/v3/53d95e4c1b3649a19f83f206226cf482",
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
    }
  },
  etherscan: {
    apiKey: {
      "sepolia": `${API_KEY}`,
      "bscTestnet": `${API_BSC_KEY}`,
      "arbitrumOne": `${API_ARBITRUM_KEY}`,
      "arbitrumSepolia": `${API_ARBITRUM_KEY}`,
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/"
        }
      }
    ]
  },
};

extendEnvironment( (hre) => {
  if (hre.INITIALIZED) {
    return;
  }
  hre.SEPOLIA_CHAIN_ID = 11155111;
  hre.BCS_TESTNET_CHAIN_ID = 97;
  hre.ARBITRUM_SEPOLIA_CHAIN_ID = 421614;
  hre.ARBITRUM = 42161;
  hre.INITIALIZED = true;

  console.info(`Connected to network: ${hre.network.name}`);
  // const [signer] = hre.ethers.getSigners();
  // hre.SIGNER_ADDRESS = signer.address;
  // console.info(`Signer: ${signer.address}, balance ${await signer.getBalance()}`);
  // console.info();
});

export default config;
