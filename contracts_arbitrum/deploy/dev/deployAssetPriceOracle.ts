module.exports = async ({ getNamedAccounts, deployments, ethers }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const addressesProvider = await ethers.getContract('AddressesProvider');
  await deploy('AssetPriceOracle', {
    from: deployer,
    args: [addressesProvider.address],
    log: true,
    dependencies: ['DevUSDT']
  });
  const assetPriceOracle = await deployments.get('AssetPriceOracle');

  const tx1 = await addressesProvider.setAssetPriceOracle(assetPriceOracle.address);
  await tx1.wait();
  console.log('Set AssetPriceOracle in AddressesProvider', assetPriceOracle.address);

  const tx2 = await addressesProvider.setAssetPriceOracleAdmin(deployer);
  await tx2.wait();
  console.log('Set AssetPriceOracleAdmin in AddressesProvider', deployer);

};
module.exports.tags = ['DevAssetPriceOracle', 'local'];
module.exports.dependencies = ['DevAddressesProvider'];
