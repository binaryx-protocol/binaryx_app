// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IAsset {
  event Bought(address indexed buyer, uint256 amount);
  event Sold();

  function invest(address recipient, uint256 amount) external;

}
