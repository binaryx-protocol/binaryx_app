// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RewardsDistributor.sol";
import "./interfaces/IAddressesProvider.sol";

contract AssetPriceOracle {
  struct Price {
    uint256 price;
    uint256 timestamp;
  }

  modifier onlyOwner() {
    require(msg.sender == addressesProvider.getAssetPriceOracleAdmin(), "AssetPriceOracle: caller is not the AssetPriceOracleAdmin");
    _;
  }

  IAddressesProvider public addressesProvider;

  constructor(address _addressesProvider) {
    addressesProvider = IAddressesProvider(_addressesProvider);
  }

  mapping(address => Price) public assetPrice;

  function latestPrice(address asset) external view returns (uint256) {
    return assetPrice[asset].price;
  }

  function latestTimestamp(address asset) external view returns (uint256) {
    return assetPrice[asset].timestamp;
  }

  function setAssetPrice(address asset, uint256 price) public onlyOwner {
    assetPrice[asset].price = price;
    assetPrice[asset].timestamp = block.timestamp;
  }

  function setAssetPrices(address[] memory assets, uint256[] memory prices) external onlyOwner {
    require(assets.length == prices.length, "assets and prices must have the same length");
    for (uint256 i = 0; i < assets.length; i++) {
      setAssetPrice(assets[i], prices[i]);
    }
  }

  function addAsset(address asset, uint256 price) public onlyOwner {
    assetPrice[asset].price = price;
    assetPrice[asset].timestamp = block.timestamp;
  }

  function addAssets(address[] memory assets, uint256[] memory prices) external onlyOwner {
    require(assets.length == prices.length, "assets and prices must have the same length");
    for (uint256 i = 0; i < assets.length; i++) {
      addAsset(assets[i], prices[i]);
    }
  }

  function removeAsset(address asset) external onlyOwner {
    delete assetPrice[asset];
  }
}
