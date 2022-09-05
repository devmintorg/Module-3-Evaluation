const { ethers } = require("hardhat");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-docgen");
require("solidity-coverage");

task("highestbidder", "Prints the highest bidder and amount bid").setAction(
  async (taskArgs) => {
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.attach(process.env.NFT_CONTRACT_AUCTION);

    const highestBidder = await auction.topBidder();
    const biggestBid = await auction.topBidAmount();
    console.log("Highest Bidder: ", highestBidder, "Bid: ", biggestBid);
  }
);

task("token", "Prints the name and address of the auction token").setAction(
  async (taskArgs) => {
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.attach(process.env.NFT_CONTRACT_TOKEN);

    const auctionToken = await token.name();
    console.log("The auction is using ", auctionToken, "from ", token.address);
  }
);

task("nft", "Prints the name, address, and ID of the auctioned NFT").setAction(
  async (taskArgs) => {
    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.attach(process.env.NFT_CONTRACT_NFT);

    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.attach(process.env.NFT_CONTRACT_AUCTION);

    console.log(
      "The auction is auctioning off ",
      await nft.name(),
      "with ID, ",
      await auction.nftId(),
      ", from ",
      await nft.address
    );
  }
);

task(
  "timeleft",
  "Prints amount of time left in the auction in seconds"
).setAction(async (taskArgs) => {
  const Auction = await ethers.getContractFactory("Auction");
  const auction = await Auction.attach(process.env.NFT_CONTRACT_AUCTION);

  const auctionEndTime = await token.auctionEndTime();

  const currentTime = await new Date();

  const timeLeftInSeconds = auctionEndTime - currentTime;

  const finalTime =
    timeLeftInSeconds > 0 ? timeLeftInSeconds : "auction has ended";

  console.log("Time left in auction: ", finalTime);
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      },
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    },
  },
};
