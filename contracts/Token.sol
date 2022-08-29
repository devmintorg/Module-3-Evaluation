// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title PoopToken
/// @author Marwan Nakhaleh
contract PoopToken is ERC20, Ownable {
    constructor() ERC20("PoopToken", "POOP") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    /// @dev only the owner can mint tokens and mint them to a specific address
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
