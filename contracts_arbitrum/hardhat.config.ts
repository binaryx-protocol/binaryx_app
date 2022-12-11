import { HardhatUserConfig } from 'hardhat/config';

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-web3');
require('@openzeppelin/hardhat-upgrades');
require('hardhat-gas-reporter');
require('hardhat-deploy');
require('solidity-coverage')

require('dotenv').config();
const { hardhatConfig } = require('arb-shared-dependencies');

const accounts =
  process.env['PRIVATE_KEY']
    ? [process.env['PRIVATE_KEY']] : { mnemonic: process.env['MNEMONIC'] };

const config: HardhatUserConfig = {
  ...hardhatConfig,
  networks: {
    hardhat: {
      chainId: 421613,
      forking: {
        url: 'https://arb1.arbitrum.io/rpc',
      },
      accounts: {
        mnemonic: process.env['MNEMONIC'],
        count: 10,
      },
      tags: ["test", "local"]
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      saveDeployments: true,
      live: false,
      tags: ["staging"],
    },
    arbitrum: {
      url: 'https://arb1.arbitrum.io/rpc',
      accounts,
      tags: ["production"],
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      accounts,
      tags: ["staging"]
    },
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },
  paths: {
    deploy: 'deploy',
    deployments: 'deploys',
    imports: 'imports'
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 14,
    enabled: true,
    showTimeSpent: true,
    coinmarketcap: process.env['COINMARKETCAP_API_KEY'],

  },
};

module.exports = config;
