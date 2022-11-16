import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const SeriesMaster = await ethers.getContractFactory("SeriesMaster");
  const seriesMaster = await upgrades.deployProxy(SeriesMaster, ['https://binaryx.com/dashpanel/entity/']);
  const sc = await seriesMaster.deployed();

  console.log("🚀 SeriesMaster Deployed:", sc.address);
  deploysJson.SeriesMaster = sc.address

  writeDeploys(network.name, deploysJson)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
