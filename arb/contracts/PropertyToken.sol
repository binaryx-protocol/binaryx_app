// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PropertyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("PropertyToken", "BNRX-P1") {
        _mint(msg.sender, initialSupply);
    }
}
