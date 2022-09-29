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

    const AssetsToken = await (
        await ethers.getContractFactory('AssetsToken')
    ).connect(wallet)

    const assetsToken = await AssetsToken.deploy()
    await assetsToken.deployed()

    console.log(`manager deployed to ${assetsToken.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })