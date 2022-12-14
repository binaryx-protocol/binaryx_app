import * as config from '../../deployConfig.json';

module.exports = async ({ getNamedAccounts, ethers, getChainId }) => {
  const { deployer, company, assetReserve } = await getNamedAccounts();
  const chainId = await getChainId();
  const developers = config[chainId].developers;
  const propertyFactory = await ethers.getContract('PropertyFactory');
  const rewardsDistributor = await ethers.getContract('RewardsDistributor');
  const USDT = await ethers.getContract('UsdtfToken');
  const assetPriceOracle = await ethers.getContract('AssetPriceOracle');
  const addressesProvider = await ethers.getContract('AddressesProvider');

  console.log('deploying "PropertyFactory" with PropertyFactory', propertyFactory.address);
  const maxTotalSupply = ethers.utils.parseUnits('500', 18).mul(developers.length + 1);

  const tx1 = await propertyFactory.deployAsset(addressesProvider.address, 'Asset', 'AST', maxTotalSupply.toString(), USDT.address);
  await tx1.wait();
  console.log('Create Asset hash', tx1.hash);
  const assetLength = await propertyFactory.getAssetLength();
  const assetAddress = await propertyFactory.assets(assetLength - 1);
  console.log('New Asset Address', assetAddress);

  const asset = await ethers.getContractAt('Asset', assetAddress);

  const tx2 = await assetPriceOracle.addAsset(asset.address, ethers.utils.parseUnits('50', 6));
  await tx2.wait();
  console.log('Asset added to AssetPriceOracle');

  const assetPrice = await assetPriceOracle.latestPrice(asset.address);
  console.log('Asset price: ', ethers.utils.formatUnits(assetPrice, 6));

  const totalSupply = await asset.totalSupply();
  const tx3 = await rewardsDistributor.addPool(asset.address, 18, totalSupply);
  await tx3.wait();
  console.log('Added pool', asset.address);

  const tx4 = await USDT.approve(asset.address, ethers.constants.MaxUint256);
  await tx4.wait();
  console.log('Approved USDT to Asset by deployer', deployer);

  await Promise.all(developers.map(async (developer) => {
    const txDevInvest = await asset.invest(developer, 500);
    console.log('Invested 500 USDT to Asset by developer', developer);
    return txDevInvest.wait();
  }));

  const tx4_1 = await asset.invest(deployer, 500);
  await tx4_1.wait();
  console.log('Invested 500 USDT to Asset for deployer', deployer);

  const time = Math.round(new Date().getTime() / 1000);
  const SECONDS_IN_A_MONTH = 60 * 60 * 24 * 30;
  const tx5 = await rewardsDistributor.addEmissionPointsForPool(asset.address, [time], [time + SECONDS_IN_A_MONTH], ['1157']);
  await tx5.wait();
  console.log('Added emission points for', asset.address);

  const tx6 = await rewardsDistributor.initializePool(asset.address, company, assetReserve, 100, 100);
  await tx6.wait();
  console.log('Initialized pool for', asset.address);

  const tx7 = await rewardsDistributor.payForRent(asset.address, ethers.utils.parseUnits('3000', 6), time, time + SECONDS_IN_A_MONTH);
  await tx7.wait();
  console.log('Paid for rent for', asset.address);

  const rewardDistributorBalance = await USDT.balanceOf(rewardsDistributor.address);
  console.log('Reward distributor balance', ethers.utils.formatUnits(rewardDistributorBalance, 6));

  console.log('Developers', developers);

};
module.exports.tags = ['DevAsset', 'local'];
module.exports.dependencies = ['DevRewardsDistributor', 'DevAssetPriceOracle', 'DevPropertyFactory'];
