require("@nomicfoundation/hardhat-toolbox");
require('hardhat-docgen');
require("dotenv").config();

task("highestBidder", "Show who the highest bidder is and how much they bid")
    .setAction(async ( taskArgs ) => {
      console.log("New State is: ", taskArgs.state)
    });

task("tokenInfo", "Show what ERC20 token you are Bidding with, including the Token Address")
    .setAction(async ( taskArgs ) => {
      console.log(`withdrew ${taskArgs.amount} ETH`);
    });

task("currentlyAuctionedNFT", "Show what NFT the contract is selling, including the NFT address and NFT ID")
    .setAction(async ( taskArgs ) => {
      console.log("total supply is: ", 0);
    });

task("auctionTimeLeft", "Show how much time is left in the contract, returning the total number of seconds")
    .setAction(async ( taskArgs ) => {
      console.log("New State is: ", taskArgs.state)
    })

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  }
};
