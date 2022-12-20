import { AssetInput, AssetStatuses } from './types';
import { ethers } from 'ethers';

const hre = require('hardhat');

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

export const appFixture = async () => {
  const [owner, alise] = await hre.ethers.getSigners();

  const { addressesProvider } = await addressesProviderFixture();

  // PropertyFactory
  const PropertyFactory = await hre.ethers.getContractFactory('PropertyFactory');
  const propertyFactory = await PropertyFactory.deploy(addressesProvider.address);

  // Pay token
  const UsdtToken = await hre.ethers.getContractFactory('UsdtfToken');
  const usdtToken = await UsdtToken.deploy(100_000_000 * 1e6);

  // AssetPriceOracle
  const AssetPriceOracle = await hre.ethers.getContractFactory('AssetPriceOracle');
  const assetPriceOracle = await AssetPriceOracle.deploy(addressesProvider.address);

  // RewardDistributor
  const RewardDistributor = await hre.ethers.getContractFactory('RewardsDistributor');
  const rewardDistributor = await RewardDistributor.deploy(usdtToken.address, addressesProvider.address);

  // PropertyFactory
  const UiProvider = await hre.ethers.getContractFactory('UiProvider');
  const uiProvider = await hre.upgrades.deployProxy(UiProvider, [propertyFactory.address, assetPriceOracle.address, rewardDistributor.address]);

  // config app
  await addressesProvider.setAssetPriceOracle(assetPriceOracle.address);
  await addressesProvider.setAssetPriceOracleAdmin(owner.address);
  await addressesProvider.setRewardsDistributor(rewardDistributor.address);
  await addressesProvider.setRewardsDistributorAdmin(owner.address);
  await addressesProvider.setPropertyFactory(propertyFactory.address);
  await addressesProvider.setPropertyFactoryAdmin(owner.address);
  usdtToken.transfer(rewardDistributor.address, 1000 * 1e6);

  return { propertyFactory, uiProvider, usdtToken, assetPriceOracle, rewardDistributor, addressesProvider, owner, alise };
};

export const createManyAssets = async ({ propertyFactory, addressesProvider, usdtToken, count }) => {
  for(let i = 0; i < count; i++) {
    await propertyFactory.deployAsset(`Asset #${i}`, `AST${i}`, 10000, usdtToken.address)
  }
};

export const investToAllAssets = async ({ propertyFactory, assetPriceOracle, rewardDistributor, usdtToken, owner }) => {
  const assetAddresses = await propertyFactory.getAssets()
  for (let i = 0; i < assetAddresses.length; i++) {
    const assetAddress = assetAddresses[i];
    const asset = await hre.ethers.getContractAt('Asset', assetAddress)

    // tmp - remove from the test once we have core manager
    try {
      await rewardDistributor.addPool(asset.address, 18, 10_000);
    } catch (e) {
      console.log('Skipping addPool in test purpose')
    }
    // tmp

    await assetPriceOracle.setAssetPrice(assetAddress, 50)
    await usdtToken.approve(asset.address, 250);
    await asset.invest(owner.address, 5);
  }
};
