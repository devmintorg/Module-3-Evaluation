# Module 3 Evaluation
For this module's evaluation, you are going to create a new project with the following properties:

* A Contract called Auction.sol, which utilizes an ERC20 token (Token.sol) and an ERC721 token (NFT.sol)
* A set of test cases to test your auction using Mocha, Chai and Waffle
* A number of task automation built in hardhat and accessible in the command line
* A deployment file to deploy this contract to the Goerli Test Network, using Alchemy
* A number of additional project requirements, including utilizing a Linter, Test Coverage, Sliter and Natspec documentation

Please read through the entire assignment before starting development as you will need to setup your environment correctly to get full credit.

## Contract Description
You will build an Auction Style contract with the following properties:

* The seller will deploy this contract to the network, with the listed NFT for sale
* The sale will last N number of hours, defined by the deployer
* Participants can bid in ERC20 tokens of the deployer’s choice to purchase the NFT.
* The auction will start once the contract deployer calls the startAuction function, announcing that they are accepting bids
Bids can be made by anyone who both gives approval to the contract to send ERC20 tokens on it's behalf, but also have enough tokens owned by their account to 'approve' the bid.
Once the time for the auction has elapsed, the owner can call finalizeAuction to complete the transaction
Contract Stories
Upon initializing the contract, the NFT, ERC20 token and contract hours is defined. These variables should not be able to be updated, but they should be accessible to read.
The contract does not start until the startAuction function is called. This function cannot be called by anyone other than the contract deployer. The NFT must be made an operator of the NFT before NFT bidding can start, and the NFT deployer must also be the owner of the NFT.
Token bidders must give approval to the contract for their tokens before they can make a bid. They must also have that balance in their account before they can make a bid.
The bid function cannot be utilized before bidding has start or after bidding has ended.
A function finalizeAuction must be created to end the bidding on the contract. The contract cannot be ended until the pre-defined time has passed.
The owner and the NFT purchaser must receive their tokens and NFT respectively in order for the function to executed. Otherwise the transaction must revert. A descriptive error should be given explaining why the transaction failed.
You should have an event emit when the Auction has started, when a bid is made, when a bid is withdrawn, when the auction has ended, including details on what token was sent to who and how much the owner received in ERC20 tokens.
Contract Template
Test Cases
In a test file called Auction.js, please check for the following scenarios:

Deployments
The contract is successfully deployed to the network
The contract must have an auction time in hours, ERC20 token and NFT (plus ID) upon deployment
Starting the Auction
The contract will successfully start when the proper conditions are met
The deployer of the contract must have given the contract operator access and the contract deployer is the owner of the NFT
The auction cannot be started by anyone other than the contract deployer
Bidding cannot start until the auction has been started
Bidding
Bidding cannot start until the auction has been started.
A bid can be successfully made by a user who has successfully approved the contract to send ERC20 on their behalf and that they have enough tokens
A user who has not approved the contract for ERC20 sending cannot send tokens
A user who does not have enough ERC20 tokens cannot make a bid
When a new bidder makes a new max bid, their address and bid amount are recorded correctly
A bid cannot be made after the bid time has elapsed
Ending the Contract
The 'finalizeAuction' function cannot be called by non-owners
The auction cannot be ended until the time has elapsed for the contract
The auction successfully send the NFT to the max bidder and sends tokens to the Owner in the expected amounts
The transfer will fail if the contract does not have access to the tokens or the owners no longer have access to their tokens or NFT
The final transfer emits an event with the amount sent to the owner and the NFT sent to the user
Hardhat Automation Requirements
When Automating Your Contract, please add tasks to your hardhat.config.js that can then do the following:

Show who the highest bidder is and how much they bid
Show what ERC20 token you are Bidding with, including the Token Address
Show what NFT the contract is selling, including the NFT address and NFT ID
Show how much time is left in the contract, returning the total number of seconds
Update your README.md to explain how to use these functions are used

Deployment to Goerli Test Network
We are also going to create a deployment file for our contract into the Goerli test network. It will have the following attributes:

Network needs to deploy using a Goerli Testnet node
You will need to update your hardhat.config.js to allow for this
Create a file called DeployAuction.js to deploy your ERC20, ERC721 and your Auction to the network
NOTE: You do not need to run the contract once deployed
Update your README.md with the transaction hash of your successful deployment to show an updated example of your file
You must not push any of your secrets to your github repository
Flatten your contract and update it to remove extra SPDX references. Save it to a file called verification.tx
Provide a link to your verified contract in your README.md file. Provide the flattened contract in the top level of your repo, called Auction.sol.flatten
Additional Development Requirements
When developing this contract, please do the following:

Have your tests run every time your commit your code
Save a version of your pre-commit file called .pre-commit.sample in the top level of your repo
Setup your linter and clean your environment based on the ‘recommended’ linting practices. This setup should exist in a file called .solhint.json
Setup Test Coverage and run it on your tests. Post the outputs in your README.md under a section called Test Coverage (Only the table with test coverage percentages)
Use Natspec to document your code, including:
Title
Author
Dev notes for each function and the contracts
Do not push any secrets to your github repository
Run Slither locally and submit a copy of your slither output (human readable) in your README.md