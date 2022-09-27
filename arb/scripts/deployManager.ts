import {address} from "./address";

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
    const Manager = await (
        await ethers.getContractFactory('Manager')
    ).connect(wallet)

    const manager = await Manager.deploy(address.usdtfToken, address.usdtfToken)
    await manager.deployed()

    console.log(`p1Token deployed to ${manager.address}`)

    //
    const UsdtfToken = await (
        await ethers.getContractFactory('UsdtfToken')
    ).connect(wallet)

    const usdtfToken = await UsdtfToken.attach(address.usdtfToken)
    await usdtfToken.transfer(manager.address, web3.utils.toBN(50).mul(bn1e18).toString())

    console.log(`usdtfToken deployed to ${usdtfToken.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })