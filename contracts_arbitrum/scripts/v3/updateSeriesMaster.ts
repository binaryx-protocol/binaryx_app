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

  const SeriesMaster = await ethers.getContractFactory("SeriesMaster");
  const seriesMaster = await upgrades.upgradeProxy(deploysJson.SeriesMaster, SeriesMaster);

  console.log("🚀 SeriesMaster Updated:", seriesMaster.address);

  const v = await seriesMaster.getV()
  console.log('v', v)
  const b = await seriesMaster.balanceOf('0xD5742FAfb58CAbb89A355Ce67c2b0c9Dede6DDFB')
  console.log('b', b)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
