import { HardhatUserConfig } from "hardhat/config";
import "hardhat-erc1820";
import "hardhat-gas-reporter"

require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()
const { hardhatConfig } = require('arb-shared-dependencies')

const accounts = (
  process.env['DEVNET_PRIVKEY']
) ? [process.env['DEVNET_PRIVKEY']] : []

console.log(process.env['MAINNET_FORK_URL'])

const mnemonic =
  process.env.MNEMONIC || 'test test test test test test test test test test test test';

const config: HardhatUserConfig = {
  ...hardhatConfig,
  networks: {
    localhost: {
      chainId:1,
      gasLimit: 1_000_000_000_000,
      url: "http://127.0.0.1:8545",
      accounts,
    },
    arbitrumMain: {
      // gas: 2100000,
      // gasLimit: 0,
      url: 'https://arb1.arbitrum.io/rpc',
      accounts,
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      accounts,
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts,
    },
    hardhat: {
      chainId: 42161,
      mining: {
        auto: false,
        interval: 5000,
      },
      accounts: {
        mnemonic,
        count: 5,
        accountsBalance: '1000000000000000000000',
      },
    },
  }
}

module.exports = config
