module.exports = async ({ getNamedAccounts, deployments, ethers }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const addressesProvider = await ethers.getContract('AddressesProvider');

  await deploy('CoreManager', {
    from: deployer,
    args: [addressesProvider.address],
    log: true,
  });
  const coreManager = await ethers.getContract('CoreManager');
  const tx1 = await addressesProvider.setCoreManager(coreManager.address);
  await tx1.wait();
  console.log('CoreManager set in AddressesProvider');

  const tx2 = await addressesProvider.setCoreManagerAdmin(deployer);
  await tx2.wait();
  console.log('CoreManager admin set in AddressesProvider');

  const tx3 = await addressesProvider.setEmergencyAdmin(deployer);
  await tx3.wait();
  console.log('Emergency admin set in AddressesProvider');
};
module.exports.tags = ['DevCoreManager', 'local'];
module.exports.dependencies = ['DevAddressesProvider'];
