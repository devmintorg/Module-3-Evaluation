// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyToken ERC20 Ownable
/// @author Ann Schnabel
/// @notice One million (1,000,000) tokens generated upon deployment
contract Auction is Ownable {
    uint256 timeOfAuction;

    uint256 public immutable auctionEndTime;
    bool public auctionOpened;
    bool public auctionFinalized;

    address public topBidder;
    uint256 public topBidAmount;

    IERC721 public immutable nft;
    uint256 public immutable nftId;
    IERC20 public immutable token;

    //Events
    event auctionStarted(uint indexed _auctionEndTime);
    event madeBid(address indexed _topBidder, uint256 indexed _topBidAmount);
    event auctionFinal(
        uint256 indexed _finalAmount,
        uint256 indexed _exchangedNftId
    );

    constructor(
        IERC721 _nft,
        uint256 _nftId,
        IERC20 _token,
        uint256 _timeInHours
    ) {
        nft = _nft;
        nftId = _nftId;
        token = _token;
        timeOfAuction = block.timestamp;
        auctionEndTime = block.timestamp + _timeInHours * 1 hours;
    }

    /// @dev Only owner can start auction
    function startAuction() external onlyOwner {
        require(nft.ownerOf(nftId) == owner());
        require(nft.getApproved(nftId) == address(this));
        auctionOpened = true;
        emit auctionStarted(auctionEndTime);
    }

    function bid(uint256 _bid) external {
        require(auctionOpened, "Auction not open");
        require(block.timestamp < auctionEndTime, "Auction has closed");
        require(token.balanceOf(msg.sender) >= _bid, "Not enough funds");
        require(
            token.allowance(msg.sender, address(this)) >= _bid,
            "Contract not approved"
        );
        require(_bid > topBidAmount, "Bid not high enough");
        require(msg.sender != topBidder, "Bidder already leading");

        topBidder = msg.sender;
        topBidAmount = _bid;

        emit madeBid(msg.sender, _bid);
    }

    /// @dev Only owner can end auction
    function finalizeAuction() external onlyOwner {
        require(
            block.timestamp >= auctionEndTime,
            "Auction time has not run out"
        );

        address _topBidder = topBidder;
        uint256 _topBidAmount = topBidAmount;

        require(
            token.balanceOf(_topBidder) >= _topBidAmount,
            "Bidder has not the funds"
        );
        require(
            token.allowance(_topBidder, address(this)) >= _topBidAmount,
            "Contract not approved by bidder"
        );
        require(nft.ownerOf(nftId) == owner(), "Owner doesn't own NFT");

        topBidAmount = 0;

        token.transferFrom(_topBidder, owner(), _topBidAmount);
        nft.transferFrom(owner(), _topBidder, nftId);

        emit auctionFinal(_topBidAmount, nftId);
    }
}
