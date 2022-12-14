// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IAddressesProvider.sol";

contract AddressesProvider is IAddressesProvider, Ownable {
  mapping(bytes32 => address) private _addresses;

  bytes32 private constant REWARDS_DISTRIBUTOR = 'REWARDS_DISTRIBUTOR';
  bytes32 private constant ASSET_PRICE_ORACLE = 'LENDING_POOL_CONFIGURATOR';
  bytes32 private constant MASTER_SERIES = 'MASTER_SERIES';
  bytes32 private constant REWARD_DISTRIBUTOR_ADMIN = 'REWARD_DISTRIBUTOR_ADMIN';
  bytes32 private constant ASSET_PRICE_ORACLE_ADMIN = 'ASSET_PRICE_ORACLE_ADMIN';
  bytes32 private constant EMERGENCY_ADMIN = 'EMERGENCY_ADMIN';
  bytes32 private constant PROPERTY_FACTORY = 'PROPERTY_FACTORY';
  bytes32 private constant PROPERTY_FACTORY_ADMIN = 'PROPERTY_FACTORY_ADMIN';

  function setAddress(bytes32 id, address newAddress) external override onlyOwner {
    _addresses[id] = newAddress;
    emit AddressSet(id, newAddress);
  }

  function getAddress(bytes32 id) public view override returns (address) {
    return _addresses[id];
  }

  function getRewardsDistributor() external view override returns (address) {
    return getAddress(REWARDS_DISTRIBUTOR);
  }

  function setRewardsDistributor(address _rewardDistributor) external override onlyOwner {
    _addresses[REWARDS_DISTRIBUTOR] = _rewardDistributor;
    emit RewardDistributorUpdated(_rewardDistributor);
  }

  function getAssetPriceOracle() external view override returns (address) {
    return getAddress(ASSET_PRICE_ORACLE);
  }

  function setAssetPriceOracle(address _assetPriceOracle) external override onlyOwner {
    _addresses[ASSET_PRICE_ORACLE] = _assetPriceOracle;
    emit AssetPriceOracleUpdated(_assetPriceOracle);
  }

  function getMasterSeries() external view override returns (address) {
    return getAddress(MASTER_SERIES);
  }

  function setMasterSeries(address _masterSeries) external override onlyOwner {
    _addresses[MASTER_SERIES] = _masterSeries;
    emit MasterSeriesUpdated(_masterSeries);
  }

  function getRewardsDistributorAdmin() external view override returns (address) {
    return getAddress(REWARD_DISTRIBUTOR_ADMIN);
  }

  function setRewardsDistributorAdmin(address _rewardDistributorAdmin) external override onlyOwner {
    _addresses[REWARD_DISTRIBUTOR_ADMIN] = _rewardDistributorAdmin;
    emit RewardDistributorAdminUpdated(_rewardDistributorAdmin);
  }

  function getAssetPriceOracleAdmin() external view override returns (address) {
    return getAddress(ASSET_PRICE_ORACLE_ADMIN);
  }

  function setAssetPriceOracleAdmin(address _assetPriceOracleAdmin) external override onlyOwner {
    _addresses[ASSET_PRICE_ORACLE_ADMIN] = _assetPriceOracleAdmin;
    emit AssetPriceOracleAdminUpdated(_assetPriceOracleAdmin);
  }

  function getEmergencyAdmin() external view override returns (address) {
    return getAddress(EMERGENCY_ADMIN);
  }

  function setEmergencyAdmin(address _emergencyAdmin) external override onlyOwner {
    _addresses[EMERGENCY_ADMIN] = _emergencyAdmin;
    emit EmergencyAdminUpdated(_emergencyAdmin);
  }

  function getPropertyFactory() external view override returns (address) {
    return getAddress(PROPERTY_FACTORY);
  }

  function setPropertyFactory(address _propertyFactory) external override onlyOwner {
    _addresses[PROPERTY_FACTORY] = _propertyFactory;
    emit PropertyFactoryUpdated(_propertyFactory);
  }

  function getPropertyFactoryAdmin() external view override returns (address) {
    return getAddress(PROPERTY_FACTORY_ADMIN);
  }

  function setPropertyFactoryAdmin(address _propertyFactoryAdmin) external override onlyOwner {
    _addresses[PROPERTY_FACTORY_ADMIN] = _propertyFactoryAdmin;
    emit PropertyFactoryAdminUpdated(_propertyFactoryAdmin);
  }

}
