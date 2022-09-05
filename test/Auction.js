const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = require("hardhat");

describe("Auction Contract", function () {
  let auction;
  let token;
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
    token = await Token.deploy();

    const NFT = await ethers.getContractFactory("MyNFT");
    nft = await NFT.deploy();

    nft.safeMint(deployer.address, nftId);

    const Auction = await ethers.getContractFactory("Auction");
    auction = await Auction.deploy(nft.address, nftId, token.address, 1);

    await nft.approve(auction.address, nftId);
    await token.mint(addr1.address, 100);
    await token.mint(addr2.address, 100);
    await token.mint(addr3.address, 100);
    await token.mint(addr4.address, 100);
    await token.mint(addr5.address, 100);
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
      expect(await auction.auctionOpened()).to.equal(true);
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
      await expect(auction.connect(addr1).bid(1)).to.be.revertedWith(
        "Auction not open"
      );
    });
  });

  describe("Bidding", function () {
    beforeEach(async function () {
      await auction.startAuction();
    });

    it("Should let a bidder bid if they have approved the contract and have enough tokens", async function () {
      await token.connect(addr1).approve(auction.address, 50);
      await auction.connect(addr1).bid(1);
    });
    it("Should not let a user bid if they have not approved the contract", async function () {
      await expect(auction.connect(addr1).bid(1)).to.be.revertedWith(
        "Contract not approved"
      );
    });
    it("Should not let a user bid if they don't have enough ERC20 tokens", async function () {
      await token.connect(addr1).approve(auction.address, 50);
      await expect(auction.connect(addr1).bid(200)).to.be.revertedWith(
        "Not enough funds"
      );
    });
    it("Should record the address and bid amount when a new max bidder bids", async function () {
      await token.connect(addr1).approve(auction.address, 50);
      await auction.connect(addr1).bid(50);
      expect(await auction.topBidder()).to.equal(addr1.address);
    });
    it("Should not let bids to be made after the bid time has elapsed", async function () {
      await token.connect(addr1).approve(auction.address, 50);
      await hre.network.provider.send("evm_increaseTime", [60 * 60 * 2]);
      await hre.network.provider.send("evm_mine");
      await expect(auction.connect(addr1).bid(50)).to.be.revertedWith(
        "Auction has closed"
      );
    });
  });

  describe("Ending the contract", function () {
    beforeEach(async function () {
      await auction.startAuction();
    });

    it("Should only let the owner call the finalizeAuction function", async function () {
      await expect(auction.connect(addr1).finalizeAuction()).to.be.rejectedWith(
        "Ownable: caller is not the owner"
      );
    });
    it("Should not be able to end the auction until the bid time has elapsed", async function () {
      await expect(auction.finalizeAuction()).to.be.revertedWith(
        "Auction time has not run out"
      );
    });
    it("Should send the expected NFT to the max bidder and send the expected tokens to the owner", async function () {
      await token.connect(addr1).approve(auction.address, 50);
      await auction.connect(addr1).bid(1);
      await hre.network.provider.send("evm_increaseTime", [60 * 60 * 2]);
      await hre.network.provider.send("evm_mine");
      await auction.finalizeAuction();
      expect(await token.balanceOf(deployer.address)).to.equal(1);
      expect(await nft.ownerOf(nftId)).to.equal(addr1.address);
    });
    it("Should fail if the contract does not have access to the tokens", async function () {
      await token.connect(addr1).approve(auction.address, 50);
      await auction.connect(addr1).bid(1);
      await hre.network.provider.send("evm_increaseTime", [60 * 60 * 2]);
      await hre.network.provider.send("evm_mine");
      await token.connect(addr1).transfer(addr2.address, 100);
      await expect(auction.finalizeAuction()).to.be.revertedWith(
        "Bidder has not the funds"
      );
    });
    // Here's where I would break out the other test case of the owner not owning the NFT anymore
    it("Should emit an event with the amount sent to the owner and the NFT address sent to the user when the final transfer occurs", async function () {
      await token.connect(addr1).approve(auction.address, 50);
      await auction.connect(addr1).bid(1);
      await hre.network.provider.send("evm_increaseTime", [60 * 60 * 2]);
      await hre.network.provider.send("evm_mine");
      await expect(auction.finalizeAuction())
        .to.emit(auction, "AuctionFinal")
        .withArgs(1, nftId);
    });
  });
});
