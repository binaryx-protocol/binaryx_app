// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAssetsInvestmentsManager {
  struct Investment {
    uint256 assetId;
    uint256 accumulatedAmount;
    uint256 accumulatedAt;
  }
  function investUsingUsdt(uint256 assetId, uint256 assetTokensToBuy) external;
//  function assetsByInvestor() external;
}
