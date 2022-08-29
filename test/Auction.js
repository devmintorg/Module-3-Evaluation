const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = require("hardhat");

describe("Auction Contract", function () {
  let auction;
  let nft;
  const nftId = 0;

  let deployer;
  let addr1;
  let addr2;
  let addr3;
  let addr4;
  let addr5;

  beforeEach(async function () {
    [deployer, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();

    const NFT = await ethers.getContractFactory("MyNFT");
    nft = await NFT.deploy();

    nft.safeMint(deployer.address, nftId);

    const Auction = await ethers.getContractFactory("Auction");
    auction = await Auction.deploy(nft.address, nftId, token.address, 1);

    nft.approve(auction.address, nftId);
    token.mint(addr1, ethers.utils.formatEther(100));
    token.mint(addr2, ethers.utils.formatEther(100));
    token.mint(addr3, ethers.utils.formatEther(100));
    token.mint(addr4, ethers.utils.formatEther(100));
    token.mint(addr5, ethers.utils.formatEther(100));
  });

  describe("Deployments", function () {
    it("Should deploy the contract to the network", async function () {
      expect(auction.address).to.exist;
    });
    it("Should know the auction time in hours, ERC20 token, and NFT(plus ID) upon deployment", async function () {
      expect(await auction.nft()).to.equal(nft.address);
    });
  });

  describe("Starting the Auction", function () {
    it("Should start the auction when the proper conditions are met", async function () {
      await auction.startAuction();
      expect(await auction.auctionOpen()).to.equal(true);
    });
    it("Should have be given access to the NFT by the deployer (who is also the owner) before starting the auction", async function () {
      expect((await nft.ownerOf(nftId)) === deployer.address);
      expect((await nft.getApproved(nftId)) === auction.address);
    });
    it("Should not be able to be started by anyone other than the deployer", async function () {
      await expect(auction.connect(addr1).startAuction()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
    it("Should not let bidding to start until the auction has been started", async function () {
      await expect(auction.connect(addr1).bid()).to.be.revertedWith(
        "Auction not open"
      );
    });
  });

  describe("Bidding", function () {
    it("Should let a bidder bid if they have approved the contract and have enough tokens", async function () {});
    it("Should not let a user bid if they have not approved the contract", async function () {});
    it("Should not let a user bid if they don't have enough ERC20 tokens", async function () {});
    it("Should record the address and bid amount when a new max bidder bids", async function () {});
    it("Should not let bids to be made after the bid time has elapsed", async function () {});
  });

  describe("Ending the contract", function () {
    it("Should only let the owner call the finalizeAuction function", async function () {});
    it("Should not be able to end the auction until the bid time has elapsed", async function () {});
    it("Should send the expected NFT to the max bidder and send the expected tokens to the owner", async function () {});
    it("Should fail if the contract does not have access to the tokens or the owner no longer has access to their tokens or NFT", async function () {});
    it("Should emit an event with the amount sent to the owner and the NFT address sent to the user when the final transfer occurs", async function () {});
  });
});
