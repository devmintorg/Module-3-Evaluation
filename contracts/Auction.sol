// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error ExchangeFailed(uint256 nftCost, uint256 nftId);

/// @title Auction
/// @author Marwan Nakhaleh
contract Auction is Ownable {

    //Some, but not all of your state variables
    uint256  timeOfAuction;

    uint256 auctionEndTime;
    uint256 auctionFinalized;

    address public topBidder;
    uint256 public topBidAmount;

    IERC20 public token;
    IERC721 public nft;
    uint256 public nftId;
    uint256 public numberOfHours;

    //Events
    event auctionStarted();
    event bidMade();
    event bidWithdrawn();
    event auctionEnded(address recipient, IERC20 token, uint256 amount);

    modifier approvedToSpendXTokens(uint numTokens) {
        require(token.allowance(msg.sender, address(this)) >= numTokens, "msg.sender is not approved to spend that many tokens!");
        _;
    }

     modifier hasEnoughTokensToBid(uint numTokens) {
        require(token.balanceOf(msg.sender) >= numTokens, "msg.sender does not have enough tokens to bid that much!");
        _;
    }

    modifier auctionHasStarted() {
        require(auctionEndTime > 0, "The auction hasn't started yet!");
        _;
    }

    modifier auctionHasNotEnded() {
        require(auctionEndTime >= block.timestamp, "The auction has ended!");
        _;
    }

    modifier auctionHasEnded() {
        require(block.timestamp >= auctionEndTime, "the auction isn't over yet!");
        _;
    }

    modifier bidIsHighEnough(uint256 amount) {
        require(amount > topBidAmount, "You need to bid higher than the current high bid!");
        _;
    }

    constructor(uint256 _numberOfHours, uint256 _nftId, IERC20 _token, IERC721 _nft) {
        require(_nft.ownerOf(_nftId) == msg.sender, "contract deployer doesn't actually own the NFT");
        numberOfHours = _numberOfHours;
        token = _token;
        nft = _nft;
        nftId = _nftId;
    }

    function startAuction() external onlyOwner {
        timeOfAuction = block.timestamp;
        auctionEndTime = timeOfAuction +  (numberOfHours * 1 hours);
    }

    function bid(uint256 amount) external payable auctionHasStarted auctionHasNotEnded hasEnoughTokensToBid(amount) approvedToSpendXTokens(amount) bidIsHighEnough(amount) {
        topBidAmount = amount;
        topBidder = msg.sender;
    }

    function finalizeAuction() external onlyOwner auctionHasStarted auctionHasEnded { 
        IERC20(token).transferFrom(topBidder, msg.sender, topBidAmount);
        //IERC721(nft).safeTransferFrom(msg.sender, address(this), nftId);
        IERC721(nft).safeTransferFrom(msg.sender, topBidder, nftId);
    }
}
