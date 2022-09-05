// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Auction Ownable
/// @author Ann Schnabel
/// @notice Launch this contract last out of the three
contract Auction is Ownable {
    uint256 public immutable auctionEndTime;
    bool public auctionOpened;
    bool public auctionFinalized;

    address public topBidder;
    uint256 public topBidAmount;

    IERC721 public immutable nft;
    uint256 public immutable nftId;
    IERC20 public immutable token;

    //Events
    event AuctionStarted(uint indexed _auctionEndTime);
    event MadeBid(address indexed _topBidder, uint256 indexed _topBidAmount);
    event AuctionFinal(
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
        auctionEndTime = block.timestamp + _timeInHours * 1 hours;
    }

    /// @dev Only owner can start auction
    /// @dev Contract must be approved to transfer NFT
    /// @dev Opens auction
    function startAuction() external onlyOwner {
        require(nft.ownerOf(nftId) == owner(), "Owner must own NFT");
        require(nft.getApproved(nftId) == address(this), "Contract needs approval");
        auctionOpened = true;
        emit AuctionStarted(auctionEndTime);
    }

    /// @dev Auction must have been opened
    /// @dev Auction can't be over
    /// @dev Bidder must have the tokens they want to bid
    /// @dev Contract must be approved to transfer coins on bidder's behalf
    /// @dev Bid must beat previous bid to be registered
    /// @dev Bidder must not already be highest bidder
    /// @dev Register topBidder and topBidAmount as most recent bidder and bid
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

        emit MadeBid(msg.sender, _bid);
    }

    /// @dev Only owner can end auction
    /// @dev Checks if auction has been opened
    /// @dev Checks if auction is still open
    /// @dev Checks if bidder has the tokens
    /// @dev Checks if contract has access to tokens
    /// @dev Checks if owner still has NFT
    /// @dev Checks if auction has already been finalized
    function finalizeAuction() external onlyOwner {
        require(
            block.timestamp >= auctionEndTime,
            "Auction time has not run out"
        );
        require(
            token.balanceOf(topBidder) >= topBidAmount,
            "Bidder has not the funds"
        );
        require(
            token.allowance(topBidder, address(this)) >= topBidAmount,
            "Contract not approved by bidder"
        );
        require(nft.ownerOf(nftId) == owner(), "Owner doesn't own NFT");
        require(!auctionFinalized, 'Auction already finalized');

        auctionFinalized = true;

        token.transferFrom(topBidder, owner(), topBidAmount);
        nft.transferFrom(msg.sender, topBidder, nftId);

        emit AuctionFinal(topBidAmount, nftId);
    }
}
