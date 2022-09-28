import { HardhatUserConfig } from "hardhat/config";
import "hardhat-erc1820";

require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3");
const { hardhatConfig } = require('arb-shared-dependencies')

const config: HardhatUserConfig = {
    ...hardhatConfig,
    networks: {
        ...hardhatConfig.networks,
        local: {
            url: "http://127.0.0.1:8545",
            accounts: [
                `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`,
                '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
            ],
        },
    }
}

module.exports = config
