// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// icon https://binaryx-media-i1.s3.eu-west-1.amazonaws.com/binaryx_token_icon.svg
contract BNRXToken is Initializable, ERC20BurnableUpgradeable, PausableUpgradeable, OwnableUpgradeable {
  function initialize(address owner) initializer public {
    __ERC20_init("Binaryx Protocol", "BNRX");
    __ERC20Burnable_init();
    __Pausable_init();
    __Ownable_init();

    transferOwnership(owner);
    _mint(owner, 100_000_000 * 1e18);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function getV() public view returns (string memory) {
    return "5";
  }
}
