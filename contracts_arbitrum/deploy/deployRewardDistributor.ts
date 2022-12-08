import * as config from '../deployConfig.json';
module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const localConfig = config[chainId];
  await deploy('RewardsDistributor', {
    from: deployer,
    args: [localConfig.USDT.address],
    log: true,
    deterministicDeployment: true,
  });

};
module.exports.tags = ['RewardsDistributor'];
