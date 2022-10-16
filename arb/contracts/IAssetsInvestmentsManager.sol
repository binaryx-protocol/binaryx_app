// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAssetsInvestmentsManager {
  struct Investor {
    address investor;
    uint256 claimedAmount;
  }
  struct Investment {
    uint256 earnedAmount;
    uint256 earnedAt;
  }
  function investUsingUsdt(uint256 assetId, uint256 assetTokensToBuy) external;
//  function assetsByInvestor() external;
}
