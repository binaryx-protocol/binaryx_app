const hre = require('hardhat')
const { ethers, web3 } = require('hardhat')

const { arbLog, requireEnvVariables } = require('arb-shared-dependencies')
require('dotenv').config()

requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC'])

const bn1e18 = web3.utils.toBN(1e18);

const main = async () => {
    const wallet = (await hre.ethers.getSigners())[0]
    console.log('Wallet:', wallet.address)

    const M1155 = await (
        await ethers.getContractFactory('M1155')
    ).connect(wallet)

    const m1155Token = await M1155.deploy()
    await m1155Token.deployed()

    console.log(`m1155Token deployed to ${m1155Token.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })