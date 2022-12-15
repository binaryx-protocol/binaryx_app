import {debugProxyInfo, readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";
const hre = require('hardhat')

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  console.log('process.env.DEVNET_MULTISIG_ADDRESS', process.env.DEVNET_MULTISIG_ADDRESS)
  await new Promise(r => setTimeout(r, 10000));

  console.log('Deploying...')
  const KycStore = await ethers.getContractFactory("KycStore");
  const kycStore = await upgrades.deployProxy(KycStore, []);
  const sc = await kycStore.deployed();
  console.log("🚀 KycStore Deployed:", sc.address);

  // save address
  deploysJson.KycStore = sc.address
  writeDeploys(network.name, deploysJson)

  // owner info
  const currentOwner = await sc.owner()
  console.log('currentOwner', currentOwner)

  await debugProxyInfo(deploysJson.KycStore)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
