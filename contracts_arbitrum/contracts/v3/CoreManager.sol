// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import "./interfaces/ICoreManager.sol";
import "./interfaces/IAddressesProvider.sol";
import "./PropertyFactory.sol";

contract CoreManager is ICoreManager {

  IAddressesProvider public addressesProvider;

  constructor(address _addressesProvider) {
    addressesProvider = IAddressesProvider(_addressesProvider);
  }


  modifier onlyEmergencyAdmin {
    require(
      addressesProvider.getEmergencyAdmin() == msg.sender,
      "CoreManager: The caller must be an emergency admin"
    );
    _;
  }

  modifier onlyCoreManagerAdmin {
    require(
      addressesProvider.getCoreManagerAdmin() == msg.sender,
      "CoreManager: The caller must be a core manager admin"
    );
    _;
  }

  function listingAsset(ListingParams calldata params) external override onlyCoreManagerAdmin returns (address) {
    PropertyFactory propertyFactory = PropertyFactory(addressesProvider.getPropertyFactory());
    IRewardsDistributor rewardsDistributor = IRewardsDistributor(addressesProvider.getRewardsDistributor());
    // Deploy token
    address assetAddress = propertyFactory.deployAsset(params.name, params.symbol, params.maxTotalSupply, params.buyToken);
    // TODO: Deploy series
    // TODO: Deploy asset
    // Add pool
    rewardsDistributor.addPool(assetAddress, 18, params.maxTotalSupply);
    return assetAddress;
  }

  function batchListingAsset(ListingParams[] calldata params) external override onlyCoreManagerAdmin returns (address[] memory) {
    address[] memory assets = new address[](params.length);
    PropertyFactory propertyFactory = PropertyFactory(addressesProvider.getPropertyFactory());
    IRewardsDistributor rewardsDistributor = IRewardsDistributor(addressesProvider.getRewardsDistributor());
    for (uint256 i = 0; i < params.length; i++) {
      // Deploy token
      assets[i] = propertyFactory.deployAsset(params[i].name, params[i].symbol, params[i].maxTotalSupply, params[i].buyToken);
      // TODO: Deploy series
      // TODO: Deploy asset
      // Add pool
      rewardsDistributor.addPool(assets[i], 18, params[i].maxTotalSupply);
    }
    return assets;
  }

  function addEmissionPoint(address _token, uint256[] memory _startTimes, uint256[] memory _endTimes, uint256[] memory _rewardsPerSecond) external override onlyCoreManagerAdmin {
    IRewardsDistributor rewardsDistributor = IRewardsDistributor(addressesProvider.getRewardsDistributor());
    rewardsDistributor.addEmissionPointsForPool(_token, _startTimes, _endTimes, _rewardsPerSecond);
  }

  function initPool(address _token, address companyAddress, address assetReserveAddress, uint256 companyCommission, uint256 assetReserveCommission) external override onlyCoreManagerAdmin {
    IRewardsDistributor rewardsDistributor = IRewardsDistributor(addressesProvider.getRewardsDistributor());
    rewardsDistributor.initializePool(_token, companyAddress, assetReserveAddress, companyCommission, assetReserveCommission);
  }

  function batchInitPool(address[] memory _tokens, address companyAddress, address assetReserveAddress, uint256 companyCommission, uint256 assetReserveCommission) external override onlyCoreManagerAdmin {
    IRewardsDistributor rewardsDistributor = IRewardsDistributor(addressesProvider.getRewardsDistributor());
    for (uint256 i = 0; i < _tokens.length; i++) {
      rewardsDistributor.initializePool(_tokens[i], companyAddress, assetReserveAddress, companyCommission, assetReserveCommission);
    }
  }

  function makeEmergencyCall(address contractToCall, bytes calldata callData) external override onlyEmergencyAdmin {
    (bool success, bytes memory result) = contractToCall.call(callData);
    if (!success) {
      // Next 5 lines from https://ethereum.stackexchange.com/a/83577
      if (result.length < 68) revert();
      assembly {
        result := add(result, 0x04)
      }
      revert(abi.decode(result, (string)));
    }
  }
}
