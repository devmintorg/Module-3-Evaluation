// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Auction {
    //Some, but not all of your state variables
    uint256 timeOfAuction;

    uint256 auctionEndTime;
    uint256 auctionFinalized;

    address topBidder;
    address topBidAmount;

    IERC721 public immutable nft;
    IERC20 public immutable token;

    //Events
    event auctionStarted();
    event madeBid();
    event auctionFinal();

    constructor(IERC721 _nft, IERC20 _token, uint256 _timeInHours) {
        nft = _nft;
        token = _token;
        timeOfAuction = block.timestamp;
        auctionEndTime = block.timestamp * 1 hours + _timeInHours;
    }

    function startAuction() external {}

    function bid() external payable {}

    function finalizeAuction() external {}
}
