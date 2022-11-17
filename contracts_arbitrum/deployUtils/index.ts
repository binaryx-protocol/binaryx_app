import {ethers, network, web3} from "hardhat";
const fs = require('fs');

const { requireEnvVariables } = require('arb-shared-dependencies')

export const validateEnvVars = (networkName) => {
  requireEnvVariables(['DEVNET_PRIVKEY'])

  if (networkName === 'l2') {
    throw 'network.name "l2" is deprecated - use arbitrum_main or arbitrum_goerli instead'
  }
}

export const getUsdtAddress = async (network: any, deploysJson: { Usdt: string }) => {
  let usdtfAddress;
  if (network.name === 'arbitrumMain') {
    if (!deploysJson.Usdt) {
      throw "deploysJson.Usdt is required! This is the USDT smart contract address. Please put it into " + `./deploys/${network.name}.json file.`
    }
    usdtfAddress = deploysJson.Usdt
  }
  if (network.name === 'localhost' || network.name === 'arbitrumGoerli') {
    const UsdtfToken = await ethers.getContractFactory("UsdtfToken");
    const usdtfToken = await UsdtfToken.deploy(web3.utils.toBN(1_000_000).mul(web3.utils.toBN(1e6)).toString());
    console.log('🚀 Dummy USDT deployed: ', usdtfToken.address)
    usdtfAddress = usdtfToken.address
  }
  if (!usdtfAddress) {
    throw "usdtfAddress is required"
  }
  return usdtfAddress
}

export const writeDeploys = (networkName, data) => {
  fs.writeFileSync(`./deploys/${networkName}.json`, JSON.stringify(data, undefined, 2));
}

export const readDeploys = (networkName) => {
  const fileName = `./deploys/${networkName}.json`

  if (!fs.existsSync(fileName)) {
    console.log("Writing deploy file at ", fileName);
    fs.writeFileSync(fileName, '{}');
  }

  let deploysJson;

  try {
    const data = fs.readFileSync(fileName, {encoding:"utf-8"});
    deploysJson = JSON.parse(data);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  return deploysJson
}
