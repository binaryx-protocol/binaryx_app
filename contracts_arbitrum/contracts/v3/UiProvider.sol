// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./PropertyFactory.sol";
import "./Asset.sol";
import "./RewardsDistributor.sol"; // TODO use Interface
import "hardhat/console.sol";

contract UiProvider is OwnableUpgradeable {
  PropertyFactory _assetFactory;
  AssetPriceOracle _assetPriceManager;
  RewardsDistributor _rewardsDistributor;

  function initialize(address _assetFactoryAddress, address _assetPriceManagerAddress, address _rewardsDistributorAddress) initializer external {
    __Ownable_init();
    _assetFactory = PropertyFactory(_assetFactoryAddress);
    _assetPriceManager = AssetPriceOracle(_assetPriceManagerAddress);
    _rewardsDistributor = RewardsDistributor(_rewardsDistributorAddress);
  }

  struct TokenSellInfo{
    uint maxTotalSupply;
    uint leftToBuy;
    uint tokenPrice;
  }

  struct AssetInfo{
    address pointer;
    string name;
  }

  function getAssets() public view returns(AssetInfo[] memory, TokenSellInfo[] memory) {
    Asset[] memory assets = _assetFactory.getAssets();
    uint count = assets.length;
    TokenSellInfo[] memory sellInfos = new TokenSellInfo[](count);
    AssetInfo[] memory assetInfos = new AssetInfo[](count);

    for (uint i = 1; i <= count; i++) {
      Asset asset = assets[i-1];
      sellInfos[i-1] = TokenSellInfo(
        asset.maxTotalSupply(),
        asset.leftToBuy(),
        _assetPriceManager.latestPrice(address(asset))
      );
      assetInfos[i-1] = AssetInfo(
        address(asset),
        "TODO"
      );
    }

    return (
      assetInfos,
      sellInfos
    );
  }

  struct Reward{
    uint claimed;
    uint available;
  }

  function getMyRewards() public view returns(AssetInfo[] memory, TokenSellInfo[] memory, Reward[] memory) {
    address[] memory assets = _rewardsDistributor.getUserRewards(msg.sender);
    uint count = assets.length;
    console.log(count);
    TokenSellInfo[] memory sellInfos = new TokenSellInfo[](count);
    AssetInfo[] memory assetInfos = new AssetInfo[](count);
    Reward[] memory rewards = new Reward[](count);
    uint[] memory claimableRewards = _rewardsDistributor.claimableRewards(msg.sender, assets);

    for (uint i = 1; i <= count; i++) {
      Asset asset = Asset(assets[i-1]);
      sellInfos[i-1] = TokenSellInfo(
        asset.maxTotalSupply(),
        asset.leftToBuy(),
        _assetPriceManager.latestPrice(address(asset))
      );
      assetInfos[i-1] = AssetInfo(
        address(asset),
        "TODO" // once we add more fields with https://app.clickup.com/t/33yxrkw
      );
      rewards[i-1] = Reward(
        0,
        0
      );
    }

    return (
      assetInfos,
      sellInfos,
      rewards
    );
  }
}
