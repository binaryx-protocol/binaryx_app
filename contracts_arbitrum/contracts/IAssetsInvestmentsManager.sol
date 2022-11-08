// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAssetsInvestmentsManager {
  struct Investment {
    uint256 assetId;
    uint256 accumulatedAmountDe6;
    uint256 accumulatedAt;
  }
}
