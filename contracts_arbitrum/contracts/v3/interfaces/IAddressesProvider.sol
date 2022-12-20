// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAddressesProvider {
  event AddressSet(bytes32 id, address indexed newAddress);
  event RewardDistributorUpdated(address indexed newAddress);
  event AssetPriceOracleUpdated(address indexed newAddress);
  event MasterSeriesUpdated(address indexed newAddress);
  event RewardDistributorAdminUpdated(address indexed newAddress);
  event AssetPriceOracleAdminUpdated(address indexed newAddress);
  event EmergencyAdminUpdated(address indexed newAddress);
  event PropertyFactoryUpdated(address indexed newAddress);
  event PropertyFactoryAdminUpdated(address indexed newAddress);
  event CoreManagerUpdated(address indexed newAddress);
  event CoreManagerAdminUpdated(address indexed newAddress);

  function setAddress(bytes32 id, address newAddress) external;
  function getAddress(bytes32 id) external view returns (address);
  function getRewardsDistributor() external view returns (address);
  function setRewardsDistributor(address _rewardDistributor) external;
  function getAssetPriceOracle() external view returns (address);
  function setAssetPriceOracle(address _assetPriceOracle) external;
  function getMasterSeries() external view returns (address);
  function setMasterSeries(address _masterSeries) external;
  function getRewardsDistributorAdmin() external view returns (address);
  function setRewardsDistributorAdmin(address _rewardDistributorAdmin) external;
  function getAssetPriceOracleAdmin() external view returns (address);
  function setAssetPriceOracleAdmin(address _assetPriceOracleAdmin) external;
  function getEmergencyAdmin() external view returns (address);
  function setEmergencyAdmin(address _emergencyAdmin) external;
  function getPropertyFactory() external view returns (address);
  function setPropertyFactory(address _propertyFactory) external;
  function getPropertyFactoryAdmin() external view returns (address);
  function setPropertyFactoryAdmin(address _propertyFactoryAdmin) external;
  function getCoreManager() external view returns (address);
  function setCoreManager(address _coreManager) external;
  function getCoreManagerAdmin() external view returns (address);
  function setCoreManagerAdmin(address _coreManagerAdmin) external;
}
