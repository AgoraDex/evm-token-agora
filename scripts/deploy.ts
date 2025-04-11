import { ethers, run } from "hardhat";
import { BaseContract, BigNumber, ContractFactory } from "ethers";

const deployment = {
  "arbitrum": {
    owner: "0x909A0EAF261054F9c8bE2e3d1A9a881cab8E968A",
    admin: "0x6420D774d60FDF4E7907FA1F1D6500f0FCcb33a8",
    impl: "0xc2235D1bDBa00D54dE81531b9cC3DB0508f9d6d5",
    proxy: "0xCbc18a85003633EBa44aECF54C3b3a999c51F58C",
  },
  "arbitrumSepolia": {
    owner: "0xd165e238C6110d070757b3D7Cf9Db1e63c8cC529",
    admin: "0x4098D7DeaCCf54D3fCD92B93c2A7F5792E1e1a93",
    impls: [
      "0x2b2430CdA8129c4c74f30E8cbFbC48E9531BeBFb"
    ],
    proxy: "0x55068a3ac0F8e5CaB37538918C21252C517020e5",
  },
  "ethereum": {
    admin: "0x65CA21a83aF05776D42F34d9d518e161E65dd293",
    impl: "0x2E59fe63c2DFffbB61957dB7A16f3C6824659d5D",
    proxy: "0x87B46212e805A3998B7e8077E9019c90759Ea88C",
    multi: "0xa3C608D29DC505F0EC082a17DdBa9ab24197efFc",
  },
  "sepolia": {
    admin: "0x93B5d4dA61c3237e0043D25E299f65A1cfc7b82a",
    impl: "0x01fD3a387bcFEa5510264a94792f6D6a3eFfb236",
    proxy: "0x34c73c7A232524e46a300728D27Af9F73c2774A7"
  }
};

const ARBITRUM_SEPOLIA_CHAIN_ID = 421614;
const ARBITRUM = 42161;

async function main() {
  let [owner] = await ethers.getSigners();

  let Token = await ethers.getContractFactory("AgoraToken");
  let Proxy = await ethers.getContractFactory("TokenProxy");
  let Admin = await ethers.getContractFactory("Admin");

  /*
  let admin = await Admin.attach("0x93B5d4dA61c3237e0043D25E299f65A1cfc7b82a");
   */
  let admin = await Admin.deploy();
  await admin.deployed();
  console.log(admin.address);

  /*
  let impl = await Token.attach("0x87B46212e805A3998B7e8077E9019c90759Ea88C");
   */
  let impl = await Token.deploy(); // {gasPrice: "15000000000"}
  await impl.deployed();
  console.log(impl.address);

  let init = await impl.initializeSignature("AgoraHub", "AGA", ethers.utils.parseEther("500000000"));
  let proxy = await Proxy.deploy(impl.address, admin.address, init); // {gasPrice: "27000000000"}
  await proxy.deployed();

  let token = await Token.attach(proxy.address);
  /*
    let token = await Token.attach("0xA910B6d8F431410438586b61A262418601bE59Af");
   */

  await token.addWhitelist("0x0000000000000000000000000000000000000000");
  await token.addWhitelist("0x65CA21a83aF05776D42F34d9d518e161E65dd293");

  await token.mint("0x65CA21a83aF05776D42F34d9d518e161E65dd293", ethers.utils.parseEther("10000"));

  await  impl.approve()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
