// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyToken ERC20 Ownable
/// @author Ann Schnabel
/// @notice One million (1,000,000) tokens generated upon deployment
contract Auction is Ownable {
    //Some, but not all of your state variables
    uint256 timeOfAuction;

    uint256 public immutable auctionEndTime;
    bool public auctionOpen;
    bool auctionFinalized;

    address topBidder;
    uint256 topBidAmount;

    IERC721 public immutable nft;
    uint256 public immutable nftId;
    IERC20 public immutable token;

    //Events
    event auctionStarted(uint indexed _auctionEndTime);
    event madeBid();
    event auctionFinal();

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
        auctionEndTime = block.timestamp * 1 hours + _timeInHours;
    }

    /// @dev Only owner can start auction
    function startAuction() external onlyOwner {
        require(nft.ownerOf(nftId) == owner());
        require(nft.getApproved(nftId) == address(this));
        auctionOpen = true;
        emit auctionStarted(auctionEndTime);
    }

    function bid() external payable {
        require(auctionOpen, "Auction not open");
        emit madeBid();
    }

    /// @dev Only owner can end auction
    function finalizeAuction() external onlyOwner {
        emit auctionFinal();
    }
}
