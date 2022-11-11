// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./SeriesMaster.sol";
import "./AssetsToken.sol";

contract Controller is Initializable, OwnableUpgradeable {
  AssetsToken _assetsManager;
  SeriesMaster _seriesMaster;

  function initialize(address assetsManager, address seriesMaster) initializer public {
    _assetsManager = ERC1155(assetsManager);
    _seriesMaster = ERC1155(seriesMaster);
    __Ownable_init();
  }
}
