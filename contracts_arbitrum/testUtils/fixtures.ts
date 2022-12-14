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
  const AddressesProvider = await hre.ethers.getContractFactory('AddressesProvider');
  const addressesProvider = await AddressesProvider.deploy();
  return { addressesProvider };
};

export const assetPriceOracleFixture = async () => {
  const [owner] = await hre.ethers.getSigners();
  const { addressesProvider } = await addressesProviderFixture();
  const AssetPriceOracle = await hre.ethers.getContractFactory('AssetPriceOracle');
  const assetPriceOracle = await AssetPriceOracle.deploy(addressesProvider.address);
  addressesProvider.setAssetPriceOracle(assetPriceOracle.address);
  addressesProvider.setAssetPriceOracleAdmin(owner.address);
  return { addressesProvider, assetPriceOracle };

};

export const rewardsDistributorFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();
  const { addressesProvider, assetPriceOracle } = await assetPriceOracleFixture();
  const UsdtToken = await hre.ethers.getContractFactory('UsdtfToken');
  const usdtToken = await UsdtToken.deploy(ethers.constants.WeiPerEther.mul(1000));

  const RewardDistributor = await hre.ethers.getContractFactory('RewardsDistributor');
  const rewardDistributor = await RewardDistributor.deploy(usdtToken.address, addressesProvider.address);
  usdtToken.transfer(rewardDistributor.address, ethers.utils.parseUnits('1000', 6));
  await addressesProvider.setRewardsDistributor(rewardDistributor.address);
  await addressesProvider.setRewardsDistributorAdmin(owner.address);
  return {
    rewardDistributor,
    usdtToken,
    owner,
    alice,
    bob,
    carol,
    addressesProvider,
    assetPriceOracle,
  };
};

export const assetFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();
  const {
    rewardDistributor,
    addressesProvider,
    usdtToken,
    assetPriceOracle,
  } = await rewardsDistributorFixture();

  const Asset = await hre.ethers.getContractFactory('Asset');
  const asset = await Asset.deploy(addressesProvider.address, 'Asset', 'AST', ethers.constants.WeiPerEther.mul(175), usdtToken.address);
  assetPriceOracle.addAsset(asset.address, ethers.utils.parseUnits('50', 6));
  return {
    asset,
    usdtToken,
    rewardDistributor,
    addressesProvider,
    assetPriceOracle,
    owner,
    alice,
    bob,
    carol,
  };
};

export const rewardsDistributorWithPoolFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();
  const { rewardDistributor, asset, usdtToken, addressesProvider } = await assetFixture();
  const maxTotalSupply = await asset.maxTotalSupply();
  await rewardDistributor.addPool(asset.address, 18, maxTotalSupply);
  return { rewardDistributor, usdtToken, asset, addressesProvider, owner, alice, bob, carol };
};

export const rewardsDistributorWithUSDTAndAssetFixture = async () => {
  const [owner, alice, bob, carol] = await hre.ethers.getSigners();
  const { rewardDistributor, asset, usdtToken } = await rewardsDistributorWithPoolFixture();
  await usdtToken.approve(asset.address, ethers.constants.MaxUint256);
  await asset.invest(owner.address, ethers.utils.parseEther('175'));
  return { rewardDistributor, usdtToken, asset, owner, alice, bob, carol };
};

export const kycStoreFixture = async () => {
  const [owner, wallet2] = await hre.ethers.getSigners();

  const KycStore = await hre.ethers.getContractFactory('KycStore');
  const kycStore = await hre.upgrades.deployProxy(KycStore, []);

  return { kycStore, owner, wallet2 };
};
