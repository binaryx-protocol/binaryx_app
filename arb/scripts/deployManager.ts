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

    const manager = await Manager.deploy(address.usdtfToken, address.p1Token)
    await manager.deployed()

    console.log(`manager deployed to ${manager.address}`)

    //
    const PropertyToken = await (
        await ethers.getContractFactory('PropertyToken')
    ).connect(wallet)

    const p1Token = await PropertyToken.attach(address.p1Token)
    await p1Token.transfer(manager.address, web3.utils.toBN(500).mul(bn1e18).toString())
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })