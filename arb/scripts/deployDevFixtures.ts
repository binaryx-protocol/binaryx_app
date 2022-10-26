import {AssetStatuses, UiNewAssetFormValues} from "../../src/client/app/features/assets/types";

const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

const { requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC', 'USDT_A'])

const defaultAttrs = (): UiNewAssetFormValues => ({
  name: 'Test',
  symbol: ' TST',
  title: '123',
  description: '123',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 10_000, // decimals = 0
  tokenInfo_apr: 10, // percents
  tokenInfo_tokenPriceDe6: 50 * 1e6,
})

const main = async () => {
  const usdtAddress = process.env.USDT_A
  const assetsTokenAddress = process.env.ASSETS_MANAGER_A
  const wallet = (await hre.ethers.getSigners())[0]
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

  await assetsToken.createAsset(...Object.values(defaultAttrs()))
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
