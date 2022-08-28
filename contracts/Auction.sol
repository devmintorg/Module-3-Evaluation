// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

abstract contract Auction {
    //Some, but not all of your state variables
    uint256 timeOfAuction;

    uint256 auctionEndTime;
    uint256 auctionFinalized;

    address topBidder;
    address topBidAmount;

    IERC721 nft;
    IERC20 token;

    //Events
    event auctionStarted();
    event madeBid();
    event auctionFinal();

    constructor(IERC721 _nft, IERC20 _token) {
        nft = _nft;
        token = _token;
    }

    function startAuction() external {}

    function bid() external payable {}

    function finalizeAuction() external {}
}
