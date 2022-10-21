const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

const { requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC', 'USDT_A'])

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
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
