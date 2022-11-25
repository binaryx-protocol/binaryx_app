import {debugProxyInfo, readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const hre = require('hardhat');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const [deployer] = await hre.ethers.getSigners()
  console.log('deployer.address', deployer.address)

  // await upgrades.forceImport(deploysJson.BNRXToken, await ethers.getContractFactory("BNRXToken"));
  await debugProxyInfo(deploysJson.BNRXToken)

  const adminProxy = await upgrades.admin.getInstance(deploysJson.BNRXToken);
  await adminProxy.connect(deployer).transferOwnership(process.env.DEVNET_MULTISIG_ADDRESS)
  console.log("🚀 BNRXToken adminProxy transferOwnership to:", process.env.DEVNET_MULTISIG_ADDRESS);

  // writeDeploys(network.name, deploysJson)
  await debugProxyInfo(deploysJson.BNRXToken)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
