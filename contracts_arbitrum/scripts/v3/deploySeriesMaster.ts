const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  let deploysJson;

  fs.writeFileSync(`./deploys/${network.name}.json`, '{}');

  try {
    const data = fs.readFileSync(`./deploys/${network.name}.json`, {encoding:"utf-8"});
    deploysJson = JSON.parse(data);
  } catch (err) {
    console.log('Error loading Master address: ', err);
    process.exit(1);
  }

  const SeriesMaster = await ethers.getContractFactory("SeriesMaster");
  const seriesMaster = await upgrades.deployProxy(SeriesMaster, ['https://binaryx.com/dashpanel/entity/']);
  const master = await seriesMaster.deployed();

  await master.createSeries('0xD5742FAfb58CAbb89A355Ce67c2b0c9Dede6DDFB', "New Entity")

  console.log("🚀 SeriesMaster Deployed:", master.address);
  deploysJson.SeriesMaster = master.address

  const v = await seriesMaster.getV()
  console.log('v', v)

  fs.writeFileSync(`./deploys/${network.name}.json`, JSON.stringify(deploysJson, undefined, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
