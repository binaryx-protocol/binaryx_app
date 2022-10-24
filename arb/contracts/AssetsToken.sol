// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./IAssetsTokenManager.sol";
import "./IAssetsInvestmentsManager.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AssetsToken is ERC1155, Ownable, IAssetsTokenManager, IAssetsInvestmentsManager {
  using Counters for Counters.Counter;

  uint8 public constant STATUS_UPCOMING = 1;
  uint8 public constant STATUS_ACTIVE = 2;
  uint8 public constant STATUS_SOLD_OUT = 3;
  uint8 public constant STATUS_DISABLED = 4;
  IERC20 usdt;

  mapping(uint256 => Asset) public _assets;
  mapping(address => mapping(uint256 => Investment)) public _investments; // user => { assetId => Investment }
  mapping(address => uint256[]) public _investmentsIds;
  mapping(address => uint256) public _claimed;
  Counters.Counter private _assetsCounter;

  constructor(address usdtfA) ERC1155("") {
    initialize(usdtfA);
  }

  function initialize(address usdtfA) public {
    usdt = IERC20(usdtfA);
  }

  function createAsset(
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    uint256 tokenInfo_totalSupply,
    uint256 tokenInfo_apr,
    uint256 tokenInfo_tokenPrice
  ) public override {
    uint256 id = _assetsCounter.current();
    _assetsCounter.increment();
    Asset memory newAsset = Asset(
      name,
      symbol,
      title,
      description,
      status,
      tokenInfo_totalSupply,
      tokenInfo_apr,
      tokenInfo_tokenPrice
    );
    _assets[id] = newAsset;
    _mint(address(this), id, tokenInfo_totalSupply, "");
  }

  function onERC1155Received(
    address operator,
    address from,
    uint256 id,
    uint256 value,
    bytes calldata data
  ) external returns (bytes4) {
    return 0xf23a6e61;
  }

  function onERC1155BatchReceived(
    address operator,
    address from,
    uint256[] calldata ids,
    uint256[] calldata values,
    bytes calldata data
  ) external returns (bytes4) {
    return 0xbc197c81;
  }

  function listAssets() public override view returns(Asset[] memory) {
    uint count = _assetsCounter.current();
    Asset[] memory result = new Asset[](count);

    for (uint i = 0; i < count; i++) {
      Asset storage asset = _assets[i];
      result[i] = asset;
    }

    return result;
  }

  function updateAsset(
    uint256 id,
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    uint256 tokenInfo_totalSupply,
    uint256 tokenInfo_apr,
    uint256 tokenInfo_tokenPrice
  ) public override {
    Asset storage oldAsset = _assets[id];
    oldAsset.name = name;
    oldAsset.symbol = symbol;
    oldAsset.title = title;
    oldAsset.description = description;
    oldAsset.status = status;
  }

  function setStatus(uint256 id, uint8 status) public override {
    _assets[id].status = status;
  }

  function getAssetsCount() public view override returns(uint256) {
    return _assetsCounter.current();
  }

  function getAsset(uint256 id) public view override returns(Asset memory) {
    require(bytes(_assets[id].name).length > 0, "Not found");
    return _assets[id];
  }

  function investUsingUsdt(uint256 assetId, uint256 assetTokensToBuy) public override {
    Asset storage asset = _assets[assetId];
    uint256 costInUsdt = assetTokensToBuy * asset.tokenInfo_tokenPrice * 10**4;
    usdt.transferFrom(msg.sender, address(this), costInUsdt);
    _safeTransferFrom(address(this), msg.sender, assetId, assetTokensToBuy, "");

    // save investment
    if (_investments[msg.sender][assetId].assetId > 0) {
      _investments[msg.sender][assetId].assetId = assetId;
      _investments[msg.sender][assetId].accumulatedAmount = 0; // TODO calculate
      _investments[msg.sender][assetId].accumulatedAt = block.timestamp;
    } else {
      _investmentsIds[msg.sender].push(assetId);
      _investments[msg.sender][assetId] = Investment(assetId, 0, block.timestamp);
    }
  }

  //  function assetsByInvestor() public view returns(Asset[] memory) {
  //    uint count = _investments[msg.sender].length;
  //    Asset[] memory result = new Asset[](count);
  //
  //    for (uint i = 0; i < count; i++) {
  //      Asset storage asset = _assets[_investments[msg.sender][i].assetId];
  //      result[i] = asset;
  //    }
  //
  //    return result;
  //  }

  //  function estimateMyReward() public view returns(Asset[] memory) {
  //    uint count = _investments[msg.sender].length;
  //    Asset[] memory result = new Asset[](count);
  //
  //    for (uint i = 0; i < count; i++) {
  //      _balances[id][account]
  //      Asset storage asset = _assets[_investments[msg.sender][i]];
  //      result[i] = asset;
  //    }
  //
  //    return result;
  //  }

  struct RewardInfo {
    uint256 assetId;
    uint256 rewardAmount;
    Asset asset;
    uint256 multiplier;
    uint256 balance;
  }

  function getMyRewardsPerAsset() public view returns(RewardInfo[] memory, uint256 totalRewards, uint256 totalClaimed) {
    uint256 totalRewards = 0;
    uint256 count = _investmentsIds[msg.sender].length;
    RewardInfo[] memory result = new RewardInfo[](count);
    uint256 yearInSeconds = 31536000;

    for (uint i = 0; i < count; i++) {
      uint256 assetId = _investmentsIds[msg.sender][i];
      Investment storage investment = _investments[msg.sender][assetId];
      uint256 balance = balanceOf(msg.sender, assetId);
      uint256 multiplier = 0;
      uint256 timeDiff = block.timestamp - investment.accumulatedAt;
      if (timeDiff > 3600) {
        multiplier = timeDiff * 1000 / yearInSeconds;
      }
      uint256 reward = investment.accumulatedAmount + (balance * _assets[assetId].tokenInfo_tokenPrice * _assets[assetId].tokenInfo_apr * multiplier) / 1000;
      totalRewards = totalRewards + reward;
      result[i] = RewardInfo(assetId, reward, _assets[assetId], multiplier, balance);
    }
    return (result, totalRewards, 0);
  }

  function predictTotalReward() public view returns(uint256 totalReward) {
    uint256 totalRewards = 0;
    uint256 count = _investmentsIds[msg.sender].length;
    uint256 yearInSeconds = 31536000;

    for (uint i = 0; i < count; i++) {
      uint256 assetId = _investmentsIds[msg.sender][i];
      Investment storage investment = _investments[msg.sender][assetId];
      uint256 balance = balanceOf(msg.sender, assetId);
      uint256 multiplier = 0;
      uint256 timeDiff = block.timestamp - investment.accumulatedAt;
      if (timeDiff > 3600) {
        multiplier = timeDiff * 1000 / yearInSeconds;
      }
      uint256 reward = investment.accumulatedAmount + (balance * _assets[assetId].tokenInfo_tokenPrice * _assets[assetId].tokenInfo_apr * multiplier) / 1000;
      totalRewards = totalRewards + reward;
    }
    return totalRewards;
  }

  function claimRewardsInUsdt() public {
    uint256 maxAmountInCents = predictTotalReward();
    uint256 usdtAmountInMicro = maxAmountInCents;
    usdt.transfer(msg.sender, usdtAmountInMicro);
    _claimed[msg.sender] += usdtAmountInMicro;
  }
}
