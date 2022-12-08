// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRewardsDistributor {
  event BalanceUpdated(address indexed asset, address indexed user, uint256 balance);
  event Claimed(address indexed user, uint256 amount);
  event PoolAdded(address indexed asset, uint256 totalSupply);
  event PoolInitialized(address indexed asset);
  event PaidRent(address indexed user, address indexed asset, uint256 amount, uint128 startTime, uint128 endTime);

  struct UserInfo {
    uint256 amount;
    uint256 rewardDebt;
    uint256 baseClaimable;
    uint256 lastEmissionPoint;
  }

  struct PoolInfo {
    uint256 totalSupply;
    uint256 decimals;
    uint256 lastRewardTime; // Last second that reward distribution occurs.
    uint256 accRewardPerShare; // Accumulated rewards per share, times 1e12.
    uint256 currentEmissionPoint;
    bool isInitialized;
  }

  struct EmissionPoint {
    uint128 startTime;
    uint128 endTime;
    uint256 rewardsPerSecond;
  }

  function poolLength() external view returns (uint256);
  function emissionScheduleLength(address _token) external view returns (uint256);
  function getEmissionPoints(address _token, uint256 startIndex) external view returns (EmissionPoint[] memory emissionPoints);
  function calculateActualEmissionPointPerPool(address _token) external view returns (uint256);
  function claim(address user, address[] calldata _tokens) external;
  function handleAction(address _user, uint256 _balance) external;
  function setClaimReceiver(address _user, address _receiver) external;
  function addPool(address _token, uint256 _decimals, uint256 _totalSupply) external;
  function initializePool(address _token) external;
  function addEmissionPointsForPool(address _token, uint256[] memory _startTimes, uint256[] memory _endTimes, uint256[] memory _rewardsPerSecond) external;
  function payForRent(address _asset, uint256 _amount, uint128 _startTime, uint128 _endTime) external;
  function claimableRewards(address _user, address[] calldata _tokens) external view returns (uint256[] memory);
}
