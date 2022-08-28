# Module-3-Evaluation

This is the repository for the Module 3 evaluation of DevMint. In it, I will demonstrate my skills in automated testing and smart contract creation.

## Contract Description

- The seller will deploy this contract to the network, with the listed NFT for sale
- The sale will last N number of hours, defined by the deployer
- Participants can bid in ERC20 tokens of the deployer’s choice to purchase the NFT.
- The auction will start once the contract deployer calls the startAuction function, announcing that they are accepting bids
- Bids can be made by anyone who both gives approval to the contract to send ERC20 tokens on it's behalf, but also have enough tokens owned by their account to 'approve' the bid.
- Once the time for the auction has elapsed, the owner can call finalizeAuction to complete the transaction

## Automated CLI functions

- `npx hardhat highestbidder`: Show who the highest bidder is and how much they bid
- `npx hardhat tokeninfo`: Show what ERC20 token you are bidding with, including the token address
- `npx hardhat nft`: Show what NFT the contract is selling, including the NFT address and NFD id
- `npx hardhat timeleft`: Show how much time is left in the contract, returning the total number of seconds

## Use cases tested

### Deployments
- The contract is successfully deployed to the network
- The contract must have an auction time in hours, ERC20 token and NFT (plus ID) upon deployment
### Starting the Auction
- The contract will successfully start when the proper conditions are met
- The deployer of the contract must have given the contract operator access and the contract deployer is the owner of the NFT
- The auction cannot be started by anyone other than the contract deployer
- Bidding cannot start until the auction has been started
### Bidding
- Bidding cannot start until the auction has been started.
- A bid can be successfully made by a user who has successfully approved the contract to send ERC20 on their behalf and that they have enough tokens
- A user who has not approved the contract for ERC20 sending cannot send tokens
- A user who does not have enough ERC20 tokens cannot make a bid
- When a new bidder makes a new max bid, their address and bid amount are recorded correctly
- A bid cannot be made after the bid time has elapsed
### Ending the Contract
- The 'finalizeAuction' function cannot be called by non-owners
- The auction cannot be ended until the time has elapsed for the contract
- The auction successfully send the NFT to the max bidder and sends tokens to the Owner in the expected amounts
- The transfer will fail if the contract does not have access to the tokens or the owners no longer have access to their tokens or NFT
- The final transfer emits an event with the amount sent to the owner and the NFT sent to the user

## Other features

- Pre-commit hook tests each case automatically before each commit
- Solhint for linting
- Natspec documentation
- Secret keeping (but example shown)

## Test coverage highlights

## Slither output

## File Structure

/contracts
  /Auction.sol
  /NFT.sol
  /Token.sol
/scripts
  /Deploy.js
/test
  /Auction.js
pre-commit.sample
.solhint.json
.gitignore
hardhat.config.js
README.md
