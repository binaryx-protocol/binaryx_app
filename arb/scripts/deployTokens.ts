const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

const { requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC'])

const bn1e18 = web3.utils.toBN(1e18);

const main = async () => {
    const wallet = (await hre.ethers.getSigners())[0]
    console.log('Wallet:', wallet.address)

    //
    const PropertyToken = await (
        await ethers.getContractFactory('PropertyToken')
    ).connect(wallet)

    const p1Token = await PropertyToken.deploy(web3.utils.toBN(10000).mul(bn1e18).toString(), [])
    await p1Token.deployed()

    console.log(`p1Token deployed to ${p1Token.address}`)

    //
    const UsdtfToken = await (
        await ethers.getContractFactory('UsdtfToken')
    ).connect(wallet)

    const usdtfToken = await UsdtfToken.deploy(web3.utils.toBN(10000).mul(bn1e18).toString(), [])
    await usdtfToken.deployed()

    console.log(`usdtfToken deployed to ${usdtfToken.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })