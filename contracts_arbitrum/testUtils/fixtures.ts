import { AssetInput, AssetStatuses } from './types';
import { ethers } from 'ethers';

const hre = require('hardhat');

export const defaultAssetAttrs = (): AssetInput => ({
  name: 'Name',
  symbol: 'SYM',
  title: 'Title',
  description: 'Description is a long story to tell you about the asset. Let\'s write it another time.',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 10_000, // decimals = 0
  tokenInfo_apr: 10, // percents
  tokenInfo_tokenPriceDe6: 50 * 1e6, // decimals = 6
  propertyInfo_images: 'https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg,https://api.time.com/wp-content/uploads/2022/07/Worlds-Greatest-Places-2022-BaliIndonesia.jpeg',
});

export const addressesProviderFixture = async () => {
  const addressesProvider = await hre.ethers.getContractFactory('AddressesProvider');
  return await addressesProvider.deploy();
}

export const rewardsDistributorWithPoolFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();

  const UsdtToken = await hre.ethers.getContractFactory('UsdtfToken');
  const usdtToken = await UsdtToken.deploy(ethers.constants.WeiPerEther.mul(1000));

  const RewardDistributor = await hre.ethers.getContractFactory('RewardsDistributor');
  const rewardDistributor = await RewardDistributor.deploy(usdtToken.address);
  usdtToken.transfer(rewardDistributor.address, ethers.utils.parseUnits('1000', 6));

  const Asset = await hre.ethers.getContractFactory('Asset');
  const asset = await Asset.deploy();
  await asset.setRewardsDistributor(rewardDistributor.address);

  await rewardDistributor.addPool(asset.address, 18, ethers.utils.parseUnits('175', 6));

  return { rewardDistributor, usdtToken, asset, owner, alice, bob, carol };
};

export const rewardsDistributorWithUSDTAndAssetFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();

  const UsdtToken = await hre.ethers.getContractFactory('UsdtfToken');
  const usdtToken = await UsdtToken.deploy(ethers.constants.WeiPerEther.mul(1000));

  const RewardDistributor = await hre.ethers.getContractFactory('RewardsDistributor');
  const rewardDistributor = await RewardDistributor.deploy(usdtToken.address);

  const Asset = await hre.ethers.getContractFactory('Asset');
  const asset = await Asset.deploy();
  await asset.setRewardsDistributor(rewardDistributor.address);

  await rewardDistributor.addPool(asset.address, 18, ethers.utils.parseUnits('175', 6));

  return { rewardDistributor, usdtToken, asset, owner, alice, bob, carol };
};

export const rewardsDistributorFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();
  addressesProviderFixture();
  const UsdtToken = await hre.ethers.getContractFactory('UsdtfToken');
  const usdtToken = await UsdtToken.deploy(ethers.constants.WeiPerEther.mul(1000));

  const RewardDistributor = await hre.ethers.getContractFactory('RewardsDistributor');
  const rewardDistributor = await RewardDistributor.deploy(usdtToken.address);
  usdtToken.transfer(rewardDistributor.address, ethers.utils.parseUnits('1000', 6));
  return { rewardDistributor, usdtToken, owner, alice, bob, carol };
};

export const assetFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();

  const UsdtToken = await hre.ethers.getContractFactory('UsdtfToken');
  const usdtToken = await UsdtToken.deploy(ethers.utils.parseUnits("10000", 6));

  const Asset = await hre.ethers.getContractFactory('Asset');
  const asset = await Asset.deploy(ethers.constants.WeiPerEther.mul(175), usdtToken.address);
  return { asset, usdtToken, owner, alice, bob, carol };
};

// export const controllerFixture = async () => {
//   const [owner, wallet2] = await ethers.getSigners();
//
//   const SeriesMaster = await ethers.getContractFactory('SeriesMaster');
//   const seriesMaster = await upgrades.deployProxy(SeriesMaster, ['https://binaryx.com/dashpanel/entity/']);
//
//   const UsdtfToken = await ethers.getContractFactory('UsdtfToken');
//   const usdtfToken = await UsdtfToken.deploy(web3.utils.toBN(1).mul(web3.utils.toBN(1e6)).toString());
//
//   const AssetsManager = await ethers.getContractFactory('AssetsManager');
//   const assetsManager = await AssetsManager.deploy(usdtfToken.address);
//
//   const Controller = await ethers.getContractFactory('Controller');
//   const controller = await upgrades.deployProxy(Controller, [seriesMaster.address, assetsManager.address]);
//
//   return { controller, owner, wallet2 };
// };

// export const seriesMasterFixture = async () => {
//   const [owner, wallet2] = await ethers.getSigners();
//
//   const SeriesMaster = await ethers.getContractFactory('SeriesMaster');
//   const seriesMaster = await upgrades.deployProxy(SeriesMaster, ['https://binaryx.com/dashpanel/entity/']);
//
//   return { seriesMaster, owner, wallet2 };
// };
