import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";
const hre = require('hardhat')

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const [sender, nextOwner] = await hre.ethers.getSigners()
  const BNRXToken = await ethers.getContractFactory("BNRXToken");
  const bNRXToken = await upgrades.deployProxy(BNRXToken, [nextOwner.address]);
  const sc = await bNRXToken.deployed();

  console.log("🚀 BNRXToken Deployed:", sc.address);
  deploysJson.BNRXToken = sc.address

  writeDeploys(network.name, deploysJson)

  //
  const currentOwner = await sc.owner()
  console.log('currentOwner', currentOwner)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
