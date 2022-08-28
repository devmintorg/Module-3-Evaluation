const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Deployments", function () {
  it("Should deploy the contract to the network", async function () {
  });
  it("Should know the auction time in hours, ERC20 token, and NFT(plus ID) upon deployment", async function () {});
});

describe("Starting the Auction", function () {
  it("Should start the auction when the proper conditions are met", async function () {});
  it("Should be given access to the NFT by the deployer/owner before starting the auction", async function () {});
  it("Should not be able to be started by anyone other than the deployer", async function () {});
  it("Should not let bidding to start until the auction has been started", async function () {});
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
