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
  console.log('Using USDT at:', usdtAddress)

  const wallet = (await hre.ethers.getSigners())[0]
  console.log('Wallet:', wallet.address)

  const AssetsToken = await (
    await ethers.getContractFactory('AssetsToken')
  ).connect(wallet)

  const assetsToken = await AssetsToken.deploy(usdtAddress)
  await assetsToken.deployed()

  console.log(`assetsToken deployed to ${assetsToken.address}`)

  // dev only
  await assetsToken.createAsset(...Object.values(defaultAttrs()))

  const UsdtfToken = await (
    await ethers.getContractFactory('UsdtfToken')
  ).connect(wallet)
  const usdt = await UsdtfToken.attach(usdtAddress)

  await usdt.approve(assetsToken.address, 50*50 * 1e6)
  await assetsToken.investUsingUsdt(0, 5)
  await usdt.transfer(assetsToken.address, 2500 * 1e6)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
