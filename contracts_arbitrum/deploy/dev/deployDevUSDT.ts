import { ethers } from 'ethers';

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy('UsdtfToken', {
    from: deployer,
    args: [ethers.utils.parseUnits('1000000000', 6)],
    log: true,
  });


};
module.exports.tags = ['DevUSDT'];
