import {getUsdtAddress, validateEnvVars} from "../../deployUtils";
const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  let deploysJson;

  try {
    const data = fs.readFileSync(`./deploys/${network.name}.json`, {encoding:"utf-8"});
    deploysJson = JSON.parse(data);
  } catch (err) {
    console.log('Error loading Master address: ', err);
    process.exit(1);
  }

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

  fs.writeFileSync(`./deploys/${network.name}.json`, JSON.stringify(deploysJson, undefined, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
