const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

const { arbLog, requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC'])

const bn1e18 = web3.utils.toBN(1e18);

const main = async () => {
    await arbLog('BNRXToken')

    const wallet = (await hre.ethers.getSigners())[0]
    console.log('Wallet:', wallet.address)

    const BnrxToken = await (
        await ethers.getContractFactory('BNRXToken')
    ).connect(wallet)

    const bnrxToken = await BnrxToken.deploy(web3.utils.toBN(10000).mul(bn1e18).toString())
    await bnrxToken.deployed()

    console.log(`BNRXToken deployed to ${bnrxToken.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })