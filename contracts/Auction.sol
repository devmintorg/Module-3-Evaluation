// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

abstract contract Auction {

    //Some, but not all of your state variables
    uint256 timeOfAuction;

    uint256 auctionEndTime;
    uint256 auctionFinalized;

    address topBidder;
    address topBidAmount;

    //Events
    event auctionStarted();
    event madeBid();
    event auctionFinal();

    constructor() { }

    function startAuction() external { }

    function bid() external payable { }

    function finalizeAuction() external { }

}