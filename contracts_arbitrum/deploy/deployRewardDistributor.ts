module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy('RewardsDistributor', {
    from: deployer,
    args: ['0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'],
    log: true,
    deterministicDeployment: true,
  });

};
module.exports.tags = ['RewardsDistributor'];
