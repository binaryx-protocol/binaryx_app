import {readDeploys, validateEnvVars, writeDeploys} from "../../deployUtils";

const fs = require('fs');
const { network, upgrades, ethers } = require("hardhat");

async function main() {
  const SAFE_ARBITRUM_GOERLI = '0x29A442EED90B6c4c66460769155CB5e05F5B55FF'

  console.log('Transferring ownership of ProxyAdmin...');
  // The owner of the ProxyAdmin can upgrade our contracts
  await upgrades.admin.transferProxyAdminOwnership(SAFE_ARBITRUM_GOERLI);
  console.log('Transferred ownership of ProxyAdmin to:', SAFE_ARBITRUM_GOERLI);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
