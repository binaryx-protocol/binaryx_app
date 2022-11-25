import {debugProxyInfo, readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const hre = require('hardhat');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const [w1, w2] = await hre.ethers.getSigners()
  console.log('w1.address', w1.address)

  // await upgrades.forceImport(deploysJson.BNRXToken, await ethers.getContractFactory("BNRXToken"));
  await debugProxyInfo(deploysJson.BNRXToken)
  const adminProxy = await upgrades.admin.getInstance(deploysJson.BNRXToken);
  await adminProxy.connect(w2).transferOwnership(w1.address)
  console.log("🚀 BNRXToken changeProxyAdmin");

  // writeDeploys(network.name, deploysJson)
  await debugProxyInfo(deploysJson.BNRXToken)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
