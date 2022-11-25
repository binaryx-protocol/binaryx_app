import {debugProxyInfo, readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";
const hre = require('hardhat')

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const BNRXToken = await ethers.getContractFactory("BNRXToken");
  const bNRXToken = await upgrades.deployProxy(BNRXToken, [process.env.DEVNET_MULTISIG_ADDRESS]);
  const sc = await bNRXToken.deployed();
  console.log("🚀 BNRXToken Deployed:", sc.address);

  // save address
  deploysJson.BNRXToken = sc.address
  writeDeploys(network.name, deploysJson)

  // owner info
  const currentOwner = await sc.owner()
  console.log('currentOwner', currentOwner)
  const ownerBalance = await sc.balanceOf(currentOwner)
  console.log('ownerBalance', ownerBalance.toString())

  await debugProxyInfo(deploysJson.BNRXToken)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
