import {getUsdtAddress, readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";
const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  // usdt get or deploy token
  const usdtfAddress = await getUsdtAddress(network, deploysJson)
  if (deploysJson.Usdt !== usdtfAddress) {
    deploysJson.Usdt = usdtfAddress
  }

  // Deploy asset manager
  const AssetsManager = await ethers.getContractFactory("AssetsManager");
  const assetsManager = await AssetsManager.deploy(usdtfAddress);
  const sc = await assetsManager.deployed();

  console.log("🚀 AssetsManager Deployed:", sc.address);
  deploysJson.AssetsManager = sc.address

  writeDeploys(network.name, deploysJson)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
