// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface ICoreManager {

  struct ListingParams {
    string name;
    string symbol;
    uint256 maxTotalSupply;
    address buyToken;
  }

  // Create token, asset and series
  // Save address of token to series
  // Save id of series to asset
  // Add token to pool
  function listingAsset(ListingParams calldata params) external returns (address);
  function batchListingAsset(ListingParams[] calldata params) external returns (address[] memory);

  function addEmissionPoint(address _token, uint256[] memory _startTimes, uint256[] memory _endTimes, uint256[] memory _rewardsPerSecond) external;

  function initPool(address _token, address companyAddress, address assetReserveAddress, uint256 companyCommission, uint256 assetReserveCommission) external;
  function batchInitPool(address[] memory _tokens, address companyAddress, address assetReserveAddress, uint256 companyCommission, uint256 assetReserveCommission) external;

  function makeEmergencyCall(address contractToCall, bytes calldata callData) external;
}
