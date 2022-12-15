// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract KycStore is OwnableUpgradeable {
  mapping(address => bool) users;
  mapping(address => uint) approvedAt;

  function initialize() initializer external {
    __Ownable_init();
  }

  function isApproved(address userAddress) public view returns(bool) {
    return users[userAddress];
  }

  function approve(address userAddress) onlyOwner public {
    users[userAddress] = true;
    approvedAt[userAddress] = block.timestamp;
  }

  function disable(address userAddress) onlyOwner public {
    users[userAddress] = false;
  }
}
