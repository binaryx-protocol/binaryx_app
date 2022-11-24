import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const BNRXToken = await ethers.getContractFactory("BNRXToken");
  const sc = await upgrades.upgradeProxy(deploysJson.BNRXToken, BNRXToken);

  const implementation = await upgrades.erc1967.getImplementationAddress(sc.address);
  console.log("🚀 BNRXToken Updated:", sc.address);
  console.log('implementation:', implementation)

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
