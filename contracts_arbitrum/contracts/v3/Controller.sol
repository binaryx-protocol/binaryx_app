// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./SeriesMaster.sol";
import "./AssetsManager.sol";

contract Controller is Initializable, OwnableUpgradeable {
  AssetsManager _assetsManager;
  SeriesMaster _seriesMaster;

  function initialize(address assetsManager, address payable seriesMaster) initializer public {
    _assetsManager = AssetsManager(assetsManager);
    _seriesMaster = SeriesMaster(seriesMaster);
    __Ownable_init();
  }

  function updateDeps(address assetsManager, address payable seriesMaster) onlyOwner public {
    _assetsManager = AssetsManager(assetsManager);
    _seriesMaster = SeriesMaster(seriesMaster);
  }

  function listAsset(
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    uint256 tokenInfo_totalSupply,
    uint256 tokenInfo_apr,
    uint256 tokenInfo_tokenPriceDe6,
    string memory propertyInfo_images
  ) public {
    _assetsManager.createAsset(
      name,
      symbol,
      title,
      description,
      status,
      tokenInfo_totalSupply,
      tokenInfo_apr,
      tokenInfo_tokenPriceDe6,
      propertyInfo_images
    );
    _seriesMaster.createSeries(address(this), name);
  }
}
