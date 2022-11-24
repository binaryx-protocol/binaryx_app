import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";
const hre = require('hardhat')

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  // const [sender, nextOwner] = await hre.ethers.getSigners()
  const BNRXToken = await ethers.getContractFactory("BNRXToken");
  const bNRXToken = await upgrades.deployProxy(BNRXToken, ['0x12645b2EE0C091b1EE8263381278DAaa97D20FF8']);
  const sc = await bNRXToken.deployed();

  const implementation = await upgrades.erc1967.getImplementationAddress(sc.address);
  console.log("🚀 BNRXToken Deployed:", sc.address);
  console.log('implementation:', implementation)

  deploysJson.BNRXToken = sc.address
  deploysJson.BNRXToken__implementation = implementation
  writeDeploys(network.name, deploysJson)
  //
  const currentOwner = await sc.owner()
  console.log('currentOwner', currentOwner)
  const ownerBalance = await sc.balanceOf(currentOwner)
  console.log('ownerBalance', ownerBalance.toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
