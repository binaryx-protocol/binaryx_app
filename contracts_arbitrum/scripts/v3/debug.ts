// import hre from "hardhat";
const hre = require('hardhat')
const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const [wallet] = await hre.ethers.getSigners()

  const AssetsToken = await (
    await ethers.getContractFactory('AssetsToken')
  ).connect(wallet)
  const assetsToken = await AssetsToken.attach('0x721BCc10F12dc1E456aa882A9D10aF4570BaCaC1')

  const b0 = await assetsToken.balanceOf('0x1211478C44a25F306aB9B2838493B01f61642A18', 0)
  const b1 = await assetsToken.balanceOf('0x1211478C44a25F306aB9B2838493B01f61642A18', 1)
  const b2 = await assetsToken.balanceOf('0x1211478C44a25F306aB9B2838493B01f61642A18', 2)
  const b3 = await assetsToken.balanceOf('0x1211478C44a25F306aB9B2838493B01f61642A18', 3)
  console.log('b0', b0, b1, b2, b3)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
