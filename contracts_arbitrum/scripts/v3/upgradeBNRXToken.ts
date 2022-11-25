import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const BNRXToken = await ethers.getContractFactory("BNRXToken");
  const sc = await upgrades.upgradeProxy(deploysJson.BNRXToken, BNRXToken);

  console.log("🚀 BNRXToken Updated:", sc.address);
  writeDeploys(network.name, deploysJson)

  // owner info
  const currentOwner = await sc.owner()
  console.log('currentOwner', currentOwner)
  const ownerBalance = await sc.balanceOf(currentOwner)
  console.log('ownerBalance', ownerBalance.toString())

  // proxy info
  const adminAddress = await upgrades.erc1967.getAdminAddress(deploysJson.BNRXToken)
  const implementation = await upgrades.erc1967.getImplementationAddress(deploysJson.BNRXToken);
  const admin = await upgrades.admin.getInstance(deploysJson.BNRXToken);
  const adminOwner = await admin.owner();

  console.log('adminAddress:', adminAddress)
  console.log('implementation:', implementation)
  console.log('adminOwner:', adminOwner)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
