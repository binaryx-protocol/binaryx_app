module.exports = async ({ getNamedAccounts, deployments, ethers }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const addressesProvider = await ethers.getContract('AddressesProvider');

  await deploy('PropertyFactory', {
    from: deployer,
    args: [addressesProvider.address],
    log: true,
  });
  const propertyFactory = await ethers.getContract('PropertyFactory');
  const coreManager = await ethers.getContract('CoreManager');
  const tx1 = await addressesProvider.setPropertyFactory(propertyFactory.address);
  await tx1.wait();
  console.log('Set PropertyFactory to AddressesProvider', propertyFactory.address);

  const tx2 = await addressesProvider.setPropertyFactoryAdmin(coreManager.address);
  await tx2.wait();
  console.log('Set PropertyFactory admin to AddressesProvider', coreManager.address);
};
module.exports.tags = ['DevPropertyFactory', 'local'];
module.exports.dependencies = ['DevAddressesProvider', 'DevCoreManager'];
