import { HardhatUserConfig } from "hardhat/config";
import "hardhat-erc1820";
import "hardhat-gas-reporter"

require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()
const { hardhatConfig } = require('arb-shared-dependencies')

const accounts = (
  process.env['DEVNET_PRIVKEY'] && process.env['DEVNET_MULTISIG']
) ? [process.env['DEVNET_PRIVKEY'], process.env['DEVNET_MULTISIG']] : []

const config: HardhatUserConfig = {
  ...hardhatConfig,
  networks: {
    localhost: {
      gasLimit: 1_000_000_000_000,
      url: "http://127.0.0.1:8545",
      accounts,
    },
    arbitrumMain: {
      gas: 2100000,
      gasLimit: 0,
      url: '',
      accounts,
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      accounts,
    },
  }
}

module.exports = config
