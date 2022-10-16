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

  mapping(uint256 => Asset) public assetsIds;
  mapping(address => uint256[]) public _assetsByInvestor;
  Counters.Counter private _assetIds;

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
    uint256 id = _assetIds.current();
    _assetIds.increment();
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
    assetsIds[id] = newAsset;
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
    uint count = _assetIds.current();
    Asset[] memory result = new Asset[](count);

    for (uint i = 0; i < count; i++) {
      Asset storage asset = assetsIds[i];
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
    Asset storage oldAsset = assetsIds[id];
    oldAsset.name = name;
    oldAsset.symbol = symbol;
    oldAsset.title = title;
    oldAsset.description = description;
    oldAsset.status = status;
  }

  function setStatus(uint256 id, uint8 status) public override {
    assetsIds[id].status = status;
  }

  function getAssetsCount() public view override returns(uint256) {
    return _assetIds.current();
  }

  function getAsset(uint256 id) public view override returns(Asset memory) {
    require(bytes(assetsIds[id].name).length > 0, "Not found");
    return assetsIds[id];
  }

  function investUsingUsdt(uint256 assetId, uint256 assetTokensToBuy) public override {
    Asset storage asset = assetsIds[assetId];
    uint256 costInUsdt = assetTokensToBuy * asset.tokenInfo_tokenPrice * 10**4;
    usdt.transferFrom(msg.sender, address(this), costInUsdt);
    _safeTransferFrom(address(this), msg.sender, assetId, assetTokensToBuy, "");

    // save investment
    if (_assetsByInvestor[msg.sender].length == 0) {
      _assetsByInvestor[msg.sender] = new uint256[](1);
      _assetsByInvestor[msg.sender][0] = assetId;
    } else {
      _assetsByInvestor[msg.sender].push(assetId);
    }
  }
  function assetsIdsByInvestor() public view returns(uint256[] memory) {
    return _assetsByInvestor[msg.sender];
  }

  function assetsByInvestor() public view returns(Asset[] memory) {
    uint count = _assetsByInvestor[msg.sender].length;
    Asset[] memory result = new Asset[](count);

    for (uint i = 0; i < count; i++) {
      Asset storage asset = assetsIds[_assetsByInvestor[msg.sender][i]];
      result[i] = asset;
    }

    return result;
  }
}
