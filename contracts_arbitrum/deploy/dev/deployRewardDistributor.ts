module.exports = async ({ getNamedAccounts, deployments, ethers }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const USDT = await ethers.getContract('UsdtfToken');
  const addressesProvider = await ethers.getContract('AddressesProvider');
  await deploy('RewardsDistributor', {
    from: deployer,
    args: [USDT.address, addressesProvider.address],
    log: true,
    dependencies: ['DevUSDT']
  });
  const rewardsDistributor = await deployments.get('RewardsDistributor');
  const coreManager = await deployments.get('CoreManager');
  const tx1 = await USDT.approve(rewardsDistributor.address, ethers.constants.MaxUint256);
  await tx1.wait();
  console.log('Approved USDT for RewardsDistributor', rewardsDistributor.address);

  const tx2 = await addressesProvider.setRewardsDistributor(rewardsDistributor.address);
  await tx2.wait();
  console.log('Set RewardsDistributor in AddressesProvider', rewardsDistributor.address);

  const tx3 = await addressesProvider.setRewardsDistributorAdmin(coreManager.address);
  await tx3.wait();
  console.log('Set RewardsDistributor admin in AddressesProvider', coreManager.address);
};
module.exports.tags = ['DevRewardsDistributor', 'local'];
module.exports.dependencies = ['DevAddressesProvider', 'DevCoreManager'];
