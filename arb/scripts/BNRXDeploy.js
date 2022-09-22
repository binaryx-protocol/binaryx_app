const hre = require('hardhat')
const { ethers } = require('hardhat')
const { expect } = require('chai')

const { arbLog, requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC'])

const main = async () => {
    await arbLog('BNRXToken')

    const l2Wallet = (await hre.ethers.getSigners())[0]
    console.log('Your wallet address:', l2Wallet.address)

    const L2BNRXToken = await (
        await ethers.getContractFactory('BNRXToken')
    ).connect(l2Wallet)
    console.log('Deploying Election contract to L2')
    const l2election = await L2BNRXToken.deploy(10e14)
    await l2election.deployed()
    console.log(
        `BNRXToken contract is deployed to ${l2election.address}`
    )
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })