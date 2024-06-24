// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract tGPC is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gold Backed Token", "tGPC") {
        _mint(msg.sender, initialSupply);
    }
}

contract tUSDT is ERC20 {
    constructor(uint256 initialSupply) ERC20("Test USDT", "tUSDT") {
        _mint(msg.sender, initialSupply);
    }
}