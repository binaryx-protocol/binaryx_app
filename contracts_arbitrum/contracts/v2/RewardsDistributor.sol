// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardsDistributor is Ownable {
  using SafeERC20 for IERC20;

  struct UserInfo {
    uint256 amount;
    uint256 rewardDebt;
    uint256 baseClaimable;
    uint256 lastEmissionPoint;
  }

  struct PoolInfo {
    uint256 totalSupply;
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

  IERC20 public immutable rewardToken;

  address[] public registeredAssets;

  // token => Pool Info for that token.
  mapping(address => PoolInfo) public poolInfo;

  // token => Array of Emission point structs.
  mapping(address => EmissionPoint[]) public emissionSchedule;

  // token => user => Info of each user that stakes LP tokens.
  mapping(address => mapping(address => UserInfo)) public userInfo;

  // user => receiver
  mapping(address => address) public claimReceiver;

  event BalanceUpdated(
    address indexed asset,
    address indexed user,
    uint256 balance
  );

  constructor(IERC20 _rewardToken) Ownable() public {
    rewardToken = _rewardToken;
  }

  function addPool(address _token, uint256 _totalSupply) external onlyOwner {
    require(poolInfo[_token].lastRewardTime == 0);
    registeredAssets.push(_token);
    poolInfo[_token] = PoolInfo({
    totalSupply : _totalSupply,
    lastRewardTime : block.timestamp,
    accRewardPerShare : 0,
    currentEmissionPoint : 0,
    isInitialized : false
    });
  }

  function initializePool(address _token) external onlyOwner {
    require(!poolInfo[_token].isInitialized);
    poolInfo[_token].isInitialized = true;
  }

  function addEmissionPointsForPool(address _token, uint256[] memory _startTimes, uint256[] memory _endTimes, uint256[] memory _rewardsPerSecond) external onlyOwner {
    require(_startTimes.length == _endTimes.length);
    require(_startTimes.length == _rewardsPerSecond.length);
    for (uint256 i = 0; i < _startTimes.length; i++) {
      emissionSchedule[_token].push(EmissionPoint({
      startTime : uint128(_startTimes[i]),
      endTime : uint128(_endTimes[i]),
      rewardsPerSecond : _rewardsPerSecond[i]
      }));
    }
    _updatePool(_token);
  }

  function poolLength() external view returns (uint256) {
    return registeredAssets.length;
  }

  function emissionScheduleLength(address _token) external view returns (uint256) {
    return emissionSchedule[_token].length;
  }

  function getEmissionPoints(address _token, uint256 startIndex) external view returns (EmissionPoint[] memory emissionPoints) {
    uint256 length = emissionSchedule[_token].length;
    emissionPoints = new EmissionPoint[](length - startIndex);
    for (uint256 i = 0; i < length - startIndex; i++) {
      emissionPoints[i] = emissionSchedule[_token][i + startIndex];
    }
  }

  function claimableRewards(address _user, address[] calldata _tokens) external view returns (uint256[] memory) {
    uint256[] memory claimable = new uint256[](_tokens.length);
    for (uint256 i = 0; i < _tokens.length; i++) {
      address token = _tokens[i];
      PoolInfo memory pool = poolInfo[token];
      uint256 firstEmissionPoint = pool.currentEmissionPoint;
      uint256 lastEmissionPoint = calculateActualEmissionPointPerPool(token);
      if (firstEmissionPoint == lastEmissionPoint) {
        EmissionPoint memory emissionPoint = emissionSchedule[token][pool.currentEmissionPoint];
        uint256 startTime = emissionPoint.startTime > pool.lastRewardTime ? emissionPoint.startTime : pool.lastRewardTime;
        uint256 duration = block.timestamp - startTime;
        uint256 reward = duration * emissionPoint.rewardsPerSecond;
        pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / pool.totalSupply);
        pool.lastRewardTime = block.timestamp;
      } else {
        for (uint256 i = firstEmissionPoint; i <= lastEmissionPoint; i++) {
          EmissionPoint memory emissionPoint = emissionSchedule[token][i];
          uint256 startTime = emissionPoint.startTime > pool.lastRewardTime ? emissionPoint.startTime : pool.lastRewardTime;
          uint256 endTime = emissionPoint.endTime > block.timestamp ? block.timestamp : emissionPoint.endTime;
          uint256 duration = endTime - startTime;
          uint256 reward = duration * emissionPoint.rewardsPerSecond;
          pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / pool.totalSupply);
          pool.lastRewardTime = endTime;
        }
      }
      UserInfo memory user = userInfo[token][_user];
      claimable[i] = user.amount * pool.accRewardPerShare / 1e12 - user.rewardDebt;
    }
    return claimable;
  }

  function calculateActualEmissionPointPerPool(address _token) public view returns (uint256) {
    uint256 currentEmissionPoint = poolInfo[_token].currentEmissionPoint;
    EmissionPoint[] storage schedule = emissionSchedule[_token];
    if (schedule.length == 0) {
      return 0;
    }
    for (uint256 i = currentEmissionPoint; i < schedule.length; i++) {
      if (schedule[i].startTime <= block.timestamp && block.timestamp < schedule[i].endTime) {
        return i;
      }
    }
    return schedule.length - 1;
  }

  function _updatePool(address _token) internal {
    PoolInfo storage pool = poolInfo[_token];
    if (block.timestamp <= pool.lastRewardTime || !pool.isInitialized || emissionSchedule[_token].length == 0) {
      return;
    }
    uint256 firstEmissionPoint = pool.currentEmissionPoint;
    uint256 lastEmissionPoint = calculateActualEmissionPointPerPool(_token);
    if (firstEmissionPoint == lastEmissionPoint) {
      EmissionPoint memory emissionPoint = emissionSchedule[_token][pool.currentEmissionPoint];
      uint256 startTime = emissionPoint.startTime > pool.lastRewardTime ? emissionPoint.startTime : pool.lastRewardTime;
      uint256 duration = block.timestamp - startTime;
      uint256 reward = duration * emissionPoint.rewardsPerSecond;
      pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / pool.totalSupply);
      pool.lastRewardTime = block.timestamp;
    }
    else {
      for (uint256 i = firstEmissionPoint; i <= lastEmissionPoint; i++) {
        EmissionPoint memory emissionPoint = emissionSchedule[_token][i];
        uint256 endTime = emissionPoint.endTime > block.timestamp ? block.timestamp : emissionPoint.endTime;
        uint256 startTime = emissionPoint.startTime > pool.lastRewardTime ? emissionPoint.startTime : pool.lastRewardTime;
        uint256 duration = endTime - startTime;
        uint256 reward = duration * emissionPoint.rewardsPerSecond;
        pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / pool.totalSupply);
        pool.lastRewardTime = emissionPoint.endTime;
      }
      pool.currentEmissionPoint = lastEmissionPoint;
    }
  }

  function handleAction(address _user, uint256 _balance) external {
    PoolInfo storage pool = poolInfo[msg.sender];
    require(pool.lastRewardTime > 0);
    _updatePool(msg.sender);
    UserInfo storage user = userInfo[msg.sender][_user];
    if (user.amount > 0) {
      uint256 pending = user.amount * pool.accRewardPerShare / 1e12 - user.rewardDebt;
      if (pending > 0) {
        user.baseClaimable += pending;
      }
    }
    user.amount = _balance;
    user.rewardDebt = _balance * pool.accRewardPerShare / 1e12;

    emit BalanceUpdated(msg.sender, _user, _balance);
  }

  function setClaimReceiver(address _user, address _receiver) external {
    require(msg.sender == _user || msg.sender == owner());
    claimReceiver[_user] = _receiver;
  }

  function claim(address _user, address[] calldata _tokens) external {
    uint256 pending;
    for (uint i = 0; i < _tokens.length; i++) {
      PoolInfo storage pool = poolInfo[_tokens[i]];
      require(pool.lastRewardTime > 0);
      _updatePool(_tokens[i]);

      UserInfo storage user = userInfo[_tokens[i]][_user];
      uint256 currentRewardDebt = user.amount * pool.accRewardPerShare / 1e12;
      pending = pending + (currentRewardDebt - user.rewardDebt) + user.baseClaimable;
      user.baseClaimable = 0;
      user.rewardDebt = currentRewardDebt;
    }
    safeRewardTokenTransfer(_user, pending);
  }

  function safeRewardTokenTransfer(address _to, uint256 _amount) internal {
    uint256 rewardTokenBalance = rewardToken.balanceOf(address(this));
    if (_amount > rewardTokenBalance) {
      rewardToken.transfer(_to, rewardTokenBalance);
    } else {
      rewardToken.transfer(_to, _amount);
    }
  }
}
