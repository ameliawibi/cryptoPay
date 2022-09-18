// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    constructor() ERC20("MyToken", "MYT"){
        _mint(msg.sender,1000000000*10**18);
    }

function multiTransfer(address[] calldata _addresses, uint[] calldata _amounts) payable public returns (bool success) {
    for (uint i = 0; i < _addresses.length; i++) {
    transfer(_addresses[i], _amounts[i]);
    }
    return true;
}
}