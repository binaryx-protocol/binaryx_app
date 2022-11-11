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

  const Controller = await ethers.getContractFactory("Controller");
  const sc = await upgrades.upgradeProxy(deploysJson.Controller, Controller);
  // const sc = await controller.deployed();

  console.log("🚀 Controller Upgraded:", sc.address);
  deploysJson.Controller = sc.address

  fs.writeFileSync(`./deploys/${network.name}.json`, JSON.stringify(deploysJson, undefined, 2));

  console.log('CO', await sc.checkOwner())
  console.log('V', await sc.v())
  console.log('V', await sc.initialV())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
