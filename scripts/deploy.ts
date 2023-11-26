import { ethers, run } from "hardhat";
import { BaseContract, BigNumber, ContractFactory } from "ethers";

const deployment = {
  "arbitrum": {},
  "arbitrumSepolia": {
    owner: "0xd165e238C6110d070757b3D7Cf9Db1e63c8cC529",
    admin: "0x4098D7DeaCCf54D3fCD92B93c2A7F5792E1e1a93",
    impls: [
      "0x2b2430CdA8129c4c74f30E8cbFbC48E9531BeBFb"
    ],
    proxy: "0x55068a3ac0F8e5CaB37538918C21252C517020e5",
  }
};

const ARBITRUM_SEPOLIA_CHAIN_ID = 421614;
const ARBITRUM = 42161;

async function main() {
  let [owner] = await ethers.getSigners();

  let Token = await ethers.getContractFactory("AgoraToken");
  let Proxy = await ethers.getContractFactory("TokenProxy");
  let Admin = await ethers.getContractFactory("Admin");

  // let admin = await Admin.attach("0x4098D7DeaCCf54D3fCD92B93c2A7F5792E1e1a93")
  let admin = await Admin.deploy();
  await admin.deployed();

  let impl = await Token.deploy();
  await impl.deployed();

  let init = await impl.initializeSignature("Agora Token MoU", "AGA", ethers.utils.parseEther("1000000000000"));
  let proxy = await Proxy.deploy(impl.address, admin.address, init);
  await proxy.deployed();

  let token = await Token.attach(proxy.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
