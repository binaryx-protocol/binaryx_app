// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IAssetsTokenManager {
  // TODO add batch
  function createAsset(string memory name, string memory symbol, uint256 totalTokensSupply, uint256 tokenPrice, address originalOwner) external;
  function listAssets() external;
  // TODO add batch
  function patchAsset(uint256 id, string memory name, string memory symbol, uint256 totalTokensSupply, uint256 tokenPrice, address originalOwner) external;
  // TODO add batch
  function disableAsset(uint256 id) external;
}

contract AssetsToken is ERC1155, Ownable, IAssetsTokenManager {
  using Counters for Counters.Counter;

  struct Asset {
    uint256 totalTokensSupply;
    uint256 tokenPrice;
    address originalOwner;
  }

  uint256 public constant GOLD = 0;
  uint256 public constant SILVER = 1;
  uint256 public constant THORS_HAMMER = 2;
  uint256 public constant SWORD = 3;
  uint256 public constant SHIELD = 4;

  //    mapping(address => uint256[]) public investorAssetsIds;
//  mapping(address => uint256[]) public originalOwnerAssetsIds;
  mapping(uint256 => Asset) public assetsIds;
  Counters.Counter private _assetIds;

  constructor() ERC1155("") {
    _mint(msg.sender, GOLD, 10**18, "");
    _mint(msg.sender, SILVER, 10**27, "");
    _mint(msg.sender, THORS_HAMMER, 1, "");
    _mint(msg.sender, SWORD, 10**9, "");
    _mint(msg.sender, SHIELD, 10**9, "");
  }

  function createAsset(string memory name, string memory symbol, uint256 totalTokensSupply, uint256 tokenPrice, address originalOwner) public override {
    _assetIds.increment();
    uint256 id = _assetIds.current();
    assetsIds[id] = Asset(
      totalTokensSupply,
        tokenPrice,
        originalOwner
    );
  }

  function listAssets() public override {

  }

  function patchAsset(uint256 id, string memory name, string memory symbol, uint256 totalTokensSupply, uint256 tokenPrice, address originalOwner) public override {

  }

  function disableAsset(uint256 id) public override {

  }
}
