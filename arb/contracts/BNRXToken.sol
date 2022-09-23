pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BNRXToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Binaryx (dev)", "BNRX") {
        _mint(msg.sender, initialSupply);
    }
}
