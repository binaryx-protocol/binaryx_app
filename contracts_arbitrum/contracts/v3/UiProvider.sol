// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./PropertyFactory.sol";
import "./Asset.sol";
import "hardhat/console.sol";

contract UiProvider is OwnableUpgradeable {
  PropertyFactory _assetFactory;
  AssetPriceOracle _assetPriceManager;

  function initialize(address _assetFactoryAddress, address _assetPriceManagerAddress) initializer external {
    __Ownable_init();
    _assetFactory = PropertyFactory(_assetFactoryAddress);
    _assetPriceManager = AssetPriceOracle(_assetPriceManagerAddress);
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

  function listAssets() public view returns(AssetInfo[] memory, TokenSellInfo[] memory) {
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

//  function getMyRewards() public view returns(Asset[] memory, TokenSellInfo[] memory) {
//
//  }
}
