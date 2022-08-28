require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-docgen");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
};
