module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy('Asset', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true,
  });

};
module.exports.tags = ['Asset'];
