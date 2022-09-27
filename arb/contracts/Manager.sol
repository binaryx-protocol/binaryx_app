// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Manager {
    address owner;
    IERC20 usdtf;
    IERC20 p1;

    constructor(address usdtfA, address p1A) {
        owner = msg.sender;
        usdtf = IERC20(usdtfA);
        p1 = IERC20(p1A);
    }

    function investUsingUsdt(uint256 amountToBuy) public {
        //        sgToken.approve(address(this), amountToBuy);
        usdtf.transferFrom(msg.sender, address(this), amountToBuy);
        p1.transfer(msg.sender, amountToBuy);
    }
}
