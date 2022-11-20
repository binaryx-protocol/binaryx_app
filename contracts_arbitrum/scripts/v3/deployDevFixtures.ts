import {readDeploys, validateEnvVars} from "../../deployUtils";
import {network} from "hardhat";
import {AssetStatuses} from "../../testUtils/types";
import {UiNewAssetFormValues} from "../../../src/client/app/features/assets/types";

const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

const { requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

const defaultAttrs1 = (): UiNewAssetFormValues => ({
  name: 'Villa Kami',
  symbol: 'BNA1',
  title: 'Villa Kami',
  description: 'Serene location in the quiet village of Padonan, Canggu',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 10_000, // decimals = 0
  tokenInfo_apr: 12, // percents
  tokenInfo_tokenPriceDe6: 50 * 1e6,
  propertyInfo_images: 'https://cdn.villa-bali.com/cache/1024/villas/villa-kami/villa-kami-villa-kami-13-5e6609646bb2f.jpg'
})
const defaultAttrs2 = (): UiNewAssetFormValues => ({
  name: 'Villa Camilla 2',
  symbol: 'BNA2',
  title: 'Villa Camilla 2',
  description: 'Ideally located in central Canggu',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 20000, // decimals = 0
  tokenInfo_apr: 10, // percents
  tokenInfo_tokenPriceDe6: 25 * 1e6,
  propertyInfo_images: 'https://cdn.villa-bali.com/cache/1024/villas/villa-camilla-2/villa-camilla-2-34d3ed7d-6c7c-4dec-a789-431778c5f5b8-633a5e3c55b6a.jpg'
})
const defaultAttrs3 = (): UiNewAssetFormValues => ({
  name: 'Villa Lapis 1',
  symbol: 'BNA3',
  title: 'Villa Lapis 1',
  description: 'A breezy and contemporary villa with an open layout design',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 20_000, // decimals = 0
  tokenInfo_apr: 15, // percents
  tokenInfo_tokenPriceDe6: 50 * 1e6,
  propertyInfo_images: 'https://cdn.villa-bali.com/cache/1024/villas/villa-lapis-1/villa-lapis-1-villa-lapis-daylight-5-631552df9400c.jpg'
})
const defaultAttrs4 = (): UiNewAssetFormValues => ({
  name: 'Villa Nelayan',
  symbol: 'BNA4',
  title: 'Villa Nelayan',
  description: '300m away from Nelayan Beach',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 5000, // decimals = 0
  tokenInfo_apr: 20, // percents
  tokenInfo_tokenPriceDe6: 50 * 1e6,
  propertyInfo_images: 'https://cdn.villa-bali.com/cache/1024/villas/villa-nelayan/villa-nelayan-lux-7115-5ca1692cc9bef.jpg'
})

const main = async () => {
  const deploysJson = readDeploys(network.name)
  validateEnvVars(network.name)

  const usdtAddress = deploysJson.Usdt
  const assetsTokenAddress = deploysJson.AssetsManager
  const [wallet] = await hre.ethers.getSigners()
  console.log('Wallet:', wallet.address)
  console.log('usdtAddress', usdtAddress)
  console.log('assetsTokenAddress', assetsTokenAddress)

  // dev only
  const AssetsToken = await (
    await ethers.getContractFactory('AssetsToken')
  ).connect(wallet)
  const assetsToken = await AssetsToken.attach(assetsTokenAddress)

  const UsdtfToken = await (
    await ethers.getContractFactory('UsdtfToken')
  ).connect(wallet)
  const usdt = await UsdtfToken.attach(usdtAddress)

  await assetsToken.createAsset(...Object.values(defaultAttrs1()))
  await assetsToken.createAsset(...Object.values(defaultAttrs2()))
  await assetsToken.createAsset(...Object.values(defaultAttrs3()))
  await assetsToken.createAsset(...Object.values(defaultAttrs4()))

  await usdt.approve(assetsToken.address, 500 * 1e6)
  await assetsToken.investUsingUsdt(1, 5)
  await usdt.transfer(assetsToken.address, 500 * 1e6)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
