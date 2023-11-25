import { extendEnvironment, HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import path from "path";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
import { BaseContract, ContractFactory } from "ethers";
dotenv.config({path: path.resolve(__dirname, ".env")});
const { PRIVATE_KEY, API_KEY, PRIVATE_KEY_MAINNET } = process.env;

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
    }
  },
  etherscan: {
    apiKey: `${API_KEY}`,
    // customChains: [
    //   {
    //     chainId: 97,
    //     urls: {
    //       apiURL: "https://api-testnet.bscscan.com/",
    //       browserURL: "https://testnet.bscscan.com/",
    //     },
    //     network: "bscTestnet"
    //   },
    //   {
    //     chainId: 56,
    //     urls: {
    //       apiURL: "https://api.bscscan.com/",
    //       browserURL: "https://testnet.bscscan.com/",
    //     },
    //     network: "bsc"
    //   }
    // ]
  },
};

extendEnvironment((hre) => {
  hre.getSignatures = function(contract: ContractFactory | BaseContract, outputHashes: boolean): string[] {
    const funcSigs : string[] = [];
    for (const key in contract.interface.functions) {
      const func = contract.interface.getFunction(key);
      if (func.type != "function") {
        continue;
      }
      const sigHash = contract.interface.getSighash(key);
      outputHashes && console.info(`${key} => ${sigHash}`);
      funcSigs.push(sigHash);
    }
    return funcSigs;
  }
});

export default config;
