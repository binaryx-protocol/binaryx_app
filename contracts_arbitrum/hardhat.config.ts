import { HardhatUserConfig } from 'hardhat/config';

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-web3');
require('@openzeppelin/hardhat-upgrades');
require('hardhat-gas-reporter');
require('hardhat-deploy');
require('solidity-coverage')

require('dotenv').config();
const { hardhatConfig } = require('arb-shared-dependencies');

const DEFAULT_MNEMONIC = 'test test test test test test test test test test test junk'

const accounts =
  process.env['PRIVATE_KEY']
    ? [process.env['PRIVATE_KEY']] : { mnemonic: process.env['MNEMONIC'] };

const hardhatNetwork = process.env.FORK ?
  {
    chainId: 421613,
    forking: {
      url: 'https://arb-goerli.g.alchemy.com/v2/i7XMrv80YbBZuJBt6u0I7zaAmY9gzERx',
    },
    accounts: {
      mnemonic: process.env['MNEMONIC'] || DEFAULT_MNEMONIC,
      count: 10,
    },
    deploy: [ 'deploy/dev' ],
    tags: ["test", "local"]
  }
  : {
    deploy: ['deploy/dev']
  }

const config: HardhatUserConfig = {
  ...hardhatConfig,
  networks: {
    hardhat: hardhatNetwork,
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
    company: 2,
    assetReserve: 3,
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
