// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  [owner, addr1, addr2, addr3] = await ethers.getSigners();

  Token = await hre.ethers.getContractFactory("PoopToken");
  token = await Token.deploy();

  NFT = await hre.ethers.getContractFactory("TurdNFT");
  nft = await NFT.deploy(token.address);

  await nft.connect(owner).safeMint(owner);

  Auction = await hre.ethers.getContractFactory("Auction");
  auction = await Auction.deploy(24, token.address, nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
