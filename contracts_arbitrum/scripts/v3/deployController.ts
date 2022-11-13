import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const Controller = await ethers.getContractFactory("Controller");
  const controller = await upgrades.deployProxy(Controller, [deploysJson.AssetsManager, deploysJson.SeriesMaster]);
  const sc = await controller.deployed();

  console.log("🚀 Controller Deployed:", sc.address);
  deploysJson.Controller = sc.address

  writeDeploys(network.name, deploysJson)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
