// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract KycStore is OwnableUpgradeable {
  mapping(address => bool) users;

  function initialize() initializer external {
    __Ownable_init();
  }

  function isApproved(address userAddress) public view returns(bool) {
    return users[userAddress];
  }

  function approve(address userAddress, string calldata id) onlyOwner public {
    users[userAddress] = true;
  }

  function disable(address userAddress) onlyOwner public {
    users[userAddress] = false;
  }
}
