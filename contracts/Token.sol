// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyToken ERC20 Ownable
/// @author Ann Schnabel
/// @notice Launch this contract first out of the three
contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
    }

    /// @dev Minting can only be done by owner of contract
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
