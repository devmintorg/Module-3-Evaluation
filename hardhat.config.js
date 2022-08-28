require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-docgen");
require('solidity-coverage')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
  // networks: {
  //   goerli: {
  //     url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
  //     accounts: [process.env.GOERLI_PRIVATE_KEY],
  //   },
  // },
};
