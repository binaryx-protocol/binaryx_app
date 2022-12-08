// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RewardsDistributor.sol";
import "hardhat/console.sol"; // TODO: remove


contract Asset is ERC20, Ownable {
  RewardsDistributor public rewardsDistributor;

  constructor () ERC20("Asset", "ASSET") {
    _mint(msg.sender, 1000000000000000000000000);
  }

  function setRewardsDistributor(address _rewardsDistributor) external onlyOwner {
    require(_rewardsDistributor != address(0), "RewardsDistributor: zero address");
    rewardsDistributor = RewardsDistributor(_rewardsDistributor);
  }

  function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
    super._transfer(sender, recipient, amount);
    if (address(rewardsDistributor) != address(0)) {
      uint256 accountBalance = balanceOf(recipient);
      rewardsDistributor.handleAction(recipient, accountBalance);
    }
  }
}
