import {ethers, network, web3} from "hardhat";

const { requireEnvVariables } = require('arb-shared-dependencies')

export const validateEnvVars = (networkName) => {
  requireEnvVariables(['DEVNET_PRIVKEY'])

  if (networkName === 'l2') {
    throw 'network.name "l2" is deprecated - use arbitrum_main or arbitrum_goerli instead'
  }
}

export const getUsdtAddress = async (network: any, deploysJson: { Usdt: string }) => {
  let usdtfAddress;
  if (network.name === 'arbitrum_main' && network.name === 'arbitrum_goerli') {
    if (!deploysJson.Usdt) {
      throw "deploysJson.Usdt is required! This is the USDT smart contract address. Please put it into " + `./deploys/${network.name}.json file.`
    }
    usdtfAddress = deploysJson.Usdt
  }
  if (network.name === 'local') {
    const UsdtfToken = await ethers.getContractFactory("UsdtfToken");
    const usdtfToken = await UsdtfToken.deploy(web3.utils.toBN(10_000).mul(web3.utils.toBN(1e6)).toString());
    console.log('Dummy USDT deployed: ', usdtfToken.address)
    usdtfAddress = usdtfToken.address
  }
  if (!usdtfAddress) {
    throw "usdtfAddress is required"
  }
  return usdtfAddress
}
