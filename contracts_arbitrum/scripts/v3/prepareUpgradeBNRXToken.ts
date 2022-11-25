import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const hre = require('hardhat');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const [deployer] = await hre.ethers.getSigners()
  console.log('deployer.address', deployer.address)

  const BNRXToken = await ethers.getContractFactory("BNRXToken");
  // const sc = await upgrades.upgradeProxy(deploysJson.BNRXToken, BNRXToken);
  const newImplementation = await upgrades.prepareUpgrade(deploysJson.BNRXToken, BNRXToken);
  console.log("🚀 BNRXToken prepareUpgrade new implementation:", newImplementation);

  // this you can use instead of Defender to change the proxy admin owner:
  // const adminProxy = await upgrades.admin.getInstance(deploysJson.BNRXToken);
  // await adminProxy.connect(w1).upgrade(deploysJson.BNRXToken, newImplementation)

  // writeDeploys(network.name, deploysJson)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
