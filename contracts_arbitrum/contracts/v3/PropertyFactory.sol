// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RewardsDistributor.sol";
import "./Asset.sol";


contract PropertyFactory {

  modifier onlyOwner() {
    require(msg.sender == addressesProvider.getPropertyFactoryAdmin(), "PropertyFactory: caller is not the PropertyFactoryAdmin");
    _;
  }

  event NewAsset(address indexed asset);

  IAddressesProvider public addressesProvider;
  Asset[] public assets;

  constructor(address _addressesProvider) {
    addressesProvider = IAddressesProvider(_addressesProvider);
  }

  function getAssetLength() external view returns (uint256) {
    return assets.length;
  }

  function getAssets() external view returns (Asset[] memory) {
    return assets;
  }

  function deployAsset(string memory name, string memory symbol, uint256 maxTotalSupply, address buyToken) external onlyOwner returns(address) {
    Asset asset = new Asset(address(addressesProvider), name, symbol, maxTotalSupply, ERC20(buyToken));
    assets.push(asset);
    emit NewAsset(address(asset));
    return address(asset);
  }
}
