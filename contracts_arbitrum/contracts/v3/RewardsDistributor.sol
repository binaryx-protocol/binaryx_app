// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./interfaces/IRewardsDistributor.sol";
import "./interfaces/IAddressesProvider.sol";

contract RewardsDistributor is IRewardsDistributor {

  uint256 private constant COMMISSION_PRECISION = 10000; // 100%

  modifier onlyOwner() {
    require(msg.sender == addressesProvider.getRewardsDistributorAdmin(), "RewardsDistributor: caller is not the RewardsDistributorAdmin");
    _;
  }

  IAddressesProvider public immutable addressesProvider;
  IERC20 public immutable rewardToken;
  uint256 public immutable rewardTokenDecimals = 1e6;

  address[] public registeredAssets;

  // token => Pool Info for that token.
  mapping(address => PoolInfo) public poolInfo;

  // token => Array of Emission point structs.
  mapping(address => EmissionPoint[]) public emissionSchedule;

  // token => user => Info of each user that stakes LP tokens.
  mapping(address => mapping(address => UserInfo)) public userInfo;

  // user => receiver
  mapping(address => address) public claimReceiver;

  constructor(IERC20 _rewardToken, IAddressesProvider _addressesProvider) {
    require(address(_addressesProvider) != address(0), "RewardsDistributor: addresses provider is the zero address");
    require(address(_rewardToken) != address(0), "RewardsDistributor: reward token is the zero address");
    addressesProvider = _addressesProvider;
    rewardToken = _rewardToken;
  }

  function poolLength() external view override returns (uint256) {
    return registeredAssets.length;
  }

  function calculateActualEmissionPointPerPool(address _token) public view override returns (uint256) {
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

  function emissionScheduleLength(address _token) external view override returns (uint256) {
    return emissionSchedule[_token].length;
  }

  function getEmissionPoints(address _token, uint256 startIndex) external view override returns (EmissionPoint[] memory emissionPoints) {
    uint256 length = emissionSchedule[_token].length;
    emissionPoints = new EmissionPoint[](length - startIndex);
    for (uint256 i = 0; i < length - startIndex; i++) {
      emissionPoints[i] = emissionSchedule[_token][i + startIndex];
    }
  }

  function claimableRewards(address _user, address[] calldata _tokens) external view override returns (uint256[] memory) {
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
        pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / (pool.totalSupply * rewardTokenDecimals / pool.decimals));
        pool.lastRewardTime = block.timestamp;
      } else {
        for (uint256 j = firstEmissionPoint; j <= lastEmissionPoint; j++) {
          EmissionPoint memory emissionPoint = emissionSchedule[token][j];
          uint256 startTime = emissionPoint.startTime > pool.lastRewardTime ? emissionPoint.startTime : pool.lastRewardTime;
          uint256 endTime = emissionPoint.endTime > block.timestamp ? block.timestamp : emissionPoint.endTime;
          uint256 duration = endTime - startTime;
          uint256 reward = duration * emissionPoint.rewardsPerSecond;
          pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / (pool.totalSupply * rewardTokenDecimals / pool.decimals));
          pool.lastRewardTime = endTime;
        }
      }
      UserInfo memory user = userInfo[token][_user];
      claimable[i] = user.amount * rewardTokenDecimals / pool.decimals * pool.accRewardPerShare / 1e12 - user.rewardDebt;
    }
    return claimable;
  }

  function addPool(address _token, uint256 decimals, uint256 _totalSupply) external override onlyOwner {
    require(poolInfo[_token].lastRewardTime == 0);
    registeredAssets.push(_token);
    poolInfo[_token] = PoolInfo({
    totalSupply : _totalSupply,
    lastRewardTime : block.timestamp,
    accRewardPerShare : 0,
    currentEmissionPoint : 0,
    isInitialized : false,
    decimals : 10 ** decimals,
    commission : Commission({
    companyAddress : address(0),
    assetReserveAddress : address(0),
    companyCommission : 0,
    assetReserveCommission : 0
    })
    });
    emit PoolAdded(_token, _totalSupply);
  }

  function addEmissionPointsForPool(address _token, uint256[] memory _startTimes, uint256[] memory _endTimes, uint256[] memory _rewardsPerSecond) external override onlyOwner {
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

  function initializePool(address _token, address companyAddress, address assetReserveAddress, uint256 companyCommission, uint256 assetReserveCommission) external override onlyOwner {
    require(!poolInfo[_token].isInitialized, "Pool already initialized");
    require(emissionSchedule[_token].length > 0, "Emission schedule not set");
    require(companyAddress != address(0), "Company address not set");
    require(assetReserveAddress != address(0), "Asset reserve address not set");
    poolInfo[_token].isInitialized = true;
    poolInfo[_token].commission = Commission({
    companyAddress : companyAddress,
    assetReserveAddress : assetReserveAddress,
    companyCommission : companyCommission,
    assetReserveCommission : assetReserveCommission
    });

    emit PoolInitialized(_token);
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
      pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / (pool.totalSupply * rewardTokenDecimals / pool.decimals));
      pool.lastRewardTime = block.timestamp;
    }
    else {
      for (uint256 i = firstEmissionPoint; i <= lastEmissionPoint; i++) {
        EmissionPoint memory emissionPoint = emissionSchedule[_token][i];
        uint256 endTime = emissionPoint.endTime > block.timestamp ? block.timestamp : emissionPoint.endTime;
        uint256 startTime = emissionPoint.startTime > pool.lastRewardTime ? emissionPoint.startTime : pool.lastRewardTime;
        uint256 duration = endTime - startTime;
        uint256 reward = duration * emissionPoint.rewardsPerSecond;
        pool.accRewardPerShare = pool.accRewardPerShare + (reward * 1e12 / (pool.totalSupply * rewardTokenDecimals / pool.decimals));
        pool.lastRewardTime = emissionPoint.endTime;
      }
      pool.currentEmissionPoint = lastEmissionPoint;
    }
  }

  function onUserBalanceChanged(address _user, uint256 _balance) external override {
    PoolInfo storage pool = poolInfo[msg.sender];
    require(pool.lastRewardTime > 0, "Pool not found");
    _updatePool(msg.sender);
    UserInfo storage user = userInfo[msg.sender][_user];
    if (user.amount > 0) {
      uint256 pending = user.amount * rewardTokenDecimals / pool.decimals * pool.accRewardPerShare / 1e12 - user.rewardDebt;
      if (pending > 0) {
        user.baseClaimable += pending;
      }
    }
    user.amount = _balance;
    user.rewardDebt = _balance * pool.accRewardPerShare / 1e12;

    emit UserBalanceUpdated(msg.sender, _user, _balance);
  }

  function setClaimReceiver(address _user, address _receiver) external override {
    require(msg.sender == _user, "Only user can set claim receiver");
    claimReceiver[_user] = _receiver;
  }

  function claim(address _user, address[] calldata _tokens) external override {
    uint256 pending;
    for (uint i = 0; i < _tokens.length; i++) {
      PoolInfo storage pool = poolInfo[_tokens[i]];
      require(pool.lastRewardTime > 0);
      _updatePool(_tokens[i]);

      UserInfo storage user = userInfo[_tokens[i]][_user];
      uint256 currentRewardDebt = user.amount * rewardTokenDecimals / pool.decimals * pool.accRewardPerShare / 1e12;
      pending = pending + (currentRewardDebt - user.rewardDebt) + user.baseClaimable;
      user.baseClaimable = 0;
      user.rewardDebt = currentRewardDebt;
    }
    safeRewardTokenTransfer(_user, pending);
    emit Claimed(_user, pending);
  }

  function safeRewardTokenTransfer(address _to, uint256 _amount) private {
    uint256 rewardTokenBalance = rewardToken.balanceOf(address(this));
    if (_amount > rewardTokenBalance) {
      rewardToken.transfer(_to, rewardTokenBalance);
    } else {
      rewardToken.transfer(_to, _amount);
    }
  }

  function payForRent(address token, uint256 amount, uint128 startTime, uint128 endTime) external override {
    require(poolInfo[token].isInitialized, "Pool not initialized");
    require(amount > 0, "Asset: amount must be greater than 0");
    require(startTime < endTime, "Asset: startTime must be less than endTime");
    uint256 companyPart = amount * poolInfo[token].commission.companyCommission / COMMISSION_PRECISION;
    uint256 assetReservePart = amount * poolInfo[token].commission.assetReserveCommission / COMMISSION_PRECISION;
    uint256 userPart = amount - companyPart - assetReservePart;
    rewardToken.transferFrom(msg.sender, poolInfo[token].commission.companyAddress, companyPart);
    rewardToken.transferFrom(msg.sender, poolInfo[token].commission.assetReserveAddress, assetReservePart);
    rewardToken.transferFrom(msg.sender, address(this), userPart);
    emit PaidRent(msg.sender, token, amount, startTime, endTime);
    emit CompanyPaid(token, companyPart);
    emit AssetReservePaid(token, assetReservePart);
  }
}
