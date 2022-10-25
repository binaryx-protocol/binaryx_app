const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

const { requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC'])

const usdtPrecision = web3.utils.toBN(1e6);

const main = async () => {
  const wallet = (await hre.ethers.getSigners())[0]
  console.log('Wallet:', wallet.address)

  //
  const UsdtfToken = await (
    await ethers.getContractFactory('UsdtfToken')
  ).connect(wallet)

  const usdtfToken = await UsdtfToken.deploy(web3.utils.toBN(1000).mul(usdtPrecision).toString(), [])
  await usdtfToken.deployed()

  console.log(`usdtfToken deployed to ${usdtfToken.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
