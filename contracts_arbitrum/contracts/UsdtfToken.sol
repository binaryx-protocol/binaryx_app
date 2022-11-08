// NOT USED: this is ONLY for dev
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UsdtfToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("Usdt fake token", "USDTF") {
    _mint(msg.sender, initialSupply);
  }
  function decimals() public view virtual override returns (uint8) {
    return 6;
  }
  function demoMint(uint256 amount) public {
    _mint(msg.sender, amount * 1e6);
  }
}
