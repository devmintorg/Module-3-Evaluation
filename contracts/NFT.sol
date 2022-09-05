// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyNFT ERC721 Ownable
/// @author Ann Schnabel
/// @notice Launch this contract second out of the three
contract MyNFT is ERC721, Ownable {
    constructor() ERC721("MyNFT", "NFT") {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
