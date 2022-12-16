// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
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

  function listAssets() public view returns(Asset[] memory, TokenSellInfo[] memory) {
    Asset[] memory assets = _assetFactory.getAssets();
    uint count = assets.length;
    TokenSellInfo[] memory sellInfo = new TokenSellInfo[](count);

    for (uint i = 1; i <= count; i++) {
      Asset asset = assets[i];
      sellInfo[i-1] = TokenSellInfo(
        asset.maxTotalSupply(),
        asset.leftToBuy(),
        _assetPriceManager.latestPrice(address(asset))
      );
    }

    return (
      assets,
      sellInfo
    );
  }

//  function getMyRewards() public view returns(Asset[] memory, TokenSellInfo[] memory) {
//
//  }
}
