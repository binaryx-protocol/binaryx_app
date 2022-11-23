// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BNRXToken is Initializable, ERC20BurnableUpgradeable, PausableUpgradeable, OwnableUpgradeable {
  function initialize(address owner) initializer public {
    __ERC20_init("Binaryx", "BNRX");
    __ERC20Burnable_init();
    __Pausable_init();
    __Ownable_init();

    transferOwnership(owner);
    _mint(owner, 100_000_000 * 1e6);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
