const { expect } = require("chai");

describe("Auction", function () {
  let token;
  let Token;
  let NFT;
  let nft;
  let Auction;
  let auction;

  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    Token = await hre.ethers.getContractFactory("PoopToken");
    token = await Token.deploy();

    NFT = await hre.ethers.getContractFactory("TurdNFT");
    nft = await NFT.deploy(token.address);

    await nft.connect(owner).safeMint(owner.address); // TurnNFT#0 is minted

    Auction = await hre.ethers.getContractFactory("Auction");
    auction = await Auction.deploy(24, 0, token.address, nft.address);
    await nft.connect(owner).approve(auction.address, 0);
  });

  describe("Deployment", function () {
    it("The contract is successfully deployed to the network", async function () {
        await auction.deployed();
    });

    it("The contract must have an auction time in hours, ERC20 token and NFT (plus ID) upon deployment", async function () {
      const auctionTime = await auction.connect(owner).numberOfHours();
      expect(auctionTime).to.equal(24);

      const auctionToken = await auction.connect(owner).token();
      expect(auctionToken).to.equal(token.address);

      const auctionNFT = await auction.connect(owner).nft();
      expect(auctionNFT).to.equal(nft.address);
    });
  });

  describe("Starting the Auction", function () {
    it("The auction will successfully start when the proper conditions are met", async function () {
      await auction.connect(owner).startAuction();
    });

    it("The deployer of the contract must have given the contract operator access and the contract deployer is the owner of the NFT", async function () {

    });

    it("The auction cannot be started by anyone other than the contract deployer", async function () {
      await expect(auction.connect(addr1).startAuction()).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Bidding", function () {
    it("Bidding cannot start until the auction has been started", async function () {
      await expect(auction.connect(addr1).bid(100)).to.be.revertedWith("The auction hasn't started yet!");
    });

    it("A bid can be successfully made by a user who has successfully approved the contract to send ERC20 on their behalf and that they have enough tokens", async function () {
      await token.connect(owner).transfer(addr1.address, hre.ethers.utils.parseEther("200"));
      await token.connect(addr1).approve(auction.address, hre.ethers.utils.parseEther("200"));

      await auction.connect(owner).startAuction();
      
      await auction.connect(addr1).bid(hre.ethers.utils.parseEther("100")); 
    });

    it("A user who has not approved the contract for ERC20 sending cannot send tokens", async function () {
      await token.connect(owner).transfer(addr1.address, hre.ethers.utils.parseEther("200"));
      // await token.connect(addr1).approve(auction.address, hre.ethers.utils.parseEther("200"));

      await auction.connect(owner).startAuction();
      
      await expect(auction.connect(addr1).bid(hre.ethers.utils.parseEther("100"))).to.be.revertedWith("msg.sender is not approved to spend that many tokens!"); 
    });

    it("A user who does not have enough ERC20 tokens cannot make a bid", async function () {
      await token.connect(owner).transfer(addr1.address, hre.ethers.utils.parseEther("200"));
      await token.connect(addr1).approve(auction.address, hre.ethers.utils.parseEther("200"));

      await auction.connect(owner).startAuction();
      
      await expect(auction.connect(addr1).bid(hre.ethers.utils.parseEther("300"))).to.be.revertedWith("msg.sender does not have enough tokens to bid that much!"); 
    });

    it("When a new bidder makes a new max bid, their address and bid amount are recorded correctly", async function () {
      await token.connect(owner).transfer(addr1.address, hre.ethers.utils.parseEther("200"));
      await token.connect(addr1).approve(auction.address, hre.ethers.utils.parseEther("200"));

      await token.connect(owner).transfer(addr2.address, hre.ethers.utils.parseEther("300"));
      await token.connect(addr2).approve(auction.address, hre.ethers.utils.parseEther("300"));

      await auction.connect(owner).startAuction();
      
      await auction.connect(addr1).bid(hre.ethers.utils.parseEther("100")); 

      let currentTopBidder = await auction.connect(owner).topBidder();
      expect(currentTopBidder).to.equal(addr1.address);
      let currentTopBid = await auction.connect(owner).topBidAmount()
      expect(currentTopBid).to.equal(hre.ethers.utils.parseEther("100"));

      await auction.connect(addr2).bid(hre.ethers.utils.parseEther("250")); 

      currentTopBidder = await auction.connect(owner).topBidder();
      expect(currentTopBidder).to.equal(addr2.address);
      currentTopBid = await auction.connect(owner).topBidAmount()
      expect(currentTopBid).to.equal(hre.ethers.utils.parseEther("250"));
    });

    it("A bid cannot be made after the bid time has elapsed", async function () {
      await token.connect(owner).transfer(addr1.address, hre.ethers.utils.parseEther("200"));
      await token.connect(addr1).approve(auction.address, hre.ethers.utils.parseEther("200"));

      await auction.connect(owner).startAuction();
      
      await auction.connect(addr1).bid(hre.ethers.utils.parseEther("100")); 

      console.log("fast forwarding 24 hours...");
      await hre.network.provider.send("evm_increaseTime", [60*60*24]);
      await hre.network.provider.send("evm_mine");

      await expect(auction.connect(addr1).bid(hre.ethers.utils.parseEther("100"))).to.be.revertedWith("The auction has ended!");
    });
  });

  describe("Ending the contract", function () {
    beforeEach(async function () {
      await token.connect(owner).transfer(addr1.address, hre.ethers.utils.parseEther("200"));
      await token.connect(addr1).approve(auction.address, hre.ethers.utils.parseEther("200"));

      await auction.connect(owner).startAuction();
      
      await auction.connect(addr1).bid(hre.ethers.utils.parseEther("100")); 
    });

    it("The 'finalizeAuction' function cannot be called by non-owners", async function () {
      await expect(auction.connect(addr1).finalizeAuction()).to.be.revertedWith("Ownable: caller is not the owner");
      await expect(auction.connect(addr2).finalizeAuction()).to.be.revertedWith("Ownable: caller is not the owner");
      await expect(auction.connect(addr3).finalizeAuction()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("The auction cannot be ended until the time has elapsed for the contract", async function () {
      await expect(auction.connect(owner).finalizeAuction()).to.be.revertedWith("the auction isn't over yet!");
    });

    it("The auction successfully send the NFT to the max bidder and sends tokens to the Owner in the expected amounts", async function () {
      await hre.network.provider.send("evm_increaseTime", [60*60*24]);
      await hre.network.provider.send("evm_mine");
      await auction.connect(owner).finalizeAuction();
    });

    it("The transfer will fail if the contract does not have access to the tokens or the owners no longer have access to their tokens or NFT", async function () {

    });

    it("The final transfer emits an event with the amount sent to the owner and the NFT sent to the user", async function () {});
  });
});
