// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RewardsDistributor.sol";


contract AssetFactory is Ownable {
  RewardsDistributor public rewardsDistributor;


  constructor(address _rewardsDistributor) {
    rewardsDistributor = RewardsDistributor(_rewardsDistributor);
  }

  function setRewardsDistributor(address _rewardsDistributor) external onlyOwner {
    rewardsDistributor = RewardsDistributor(_rewardsDistributor);
  }
}
