# Module-3-Evaluation

This is the repository for the Module 3 evaluation of DevMint. In it, I will demonstrate my skills in automated testing and smart contract creation.

## Contract Description

- The seller will deploy this contract to the network, with the listed NFT for sale
- The sale will last N number of hours, defined by the deployer
- Participants can bid in ERC20 tokens of the deployer’s choice to purchase the NFT.
- The auction will start once the contract deployer calls the startAuction function, announcing that they are accepting bids
- Bids can be made by anyone who both gives approval to the contract to send ERC20 tokens on it's behalf, but also have enough tokens owned by their account to 'approve' the bid.
- Once the time for the auction has elapsed, the owner can call finalizeAuction to complete the transaction

## Automated CLI Functions

- `npx hardhat highestbidder`: Show who the highest bidder is and how much they bid
- `npx hardhat token`: Show what ERC20 token you are bidding with, including the token address
- `npx hardhat nft`: Show what NFT the contract is selling, including the NFT address and NFD id
- `npx hardhat timeleft`: Show how much time is left in the contract, returning the total number of seconds

## Use Cases Tested

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

## Other Features

- Pre-commit hook tests each case automatically before each commit
- Solhint for linting
- Natspec documentation
- Secret keeping (but example shown)

## Test Coverage Highlights

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
 contracts/   |      100 |    73.08 |      100 |      100 |                |
  Auction.sol |      100 |    73.08 |      100 |      100 |                |
  NFT.sol     |      100 |      100 |      100 |      100 |                |
  Token.sol   |      100 |      100 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|
All files     |      100 |    73.08 |      100 |      100 |                |
--------------|----------|----------|----------|----------|----------------|

## Slither Output

Auction.finalizeAuction() (contracts/Auction.sol#84-106) ignores return value by token.transferFrom(topBidder,owner(),topBidAmount) (contracts/Auction.sol#102)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unchecked-transfer

ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) ignores return value by IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#401-412)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unused-return

Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).retval (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#401)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) potentially used before declaration: retval == IERC721Receiver.onERC721Received.selector (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#402)
Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).reason (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#403)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) potentially used before declaration: reason.length == 0 (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#404)
Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).reason (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#403)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) potentially used before declaration: revert(uint256,uint256)(32 + reason,mload(uint256)(reason)) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#409)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#pre-declaration-usage-of-local-variables

Reentrancy in Auction.finalizeAuction() (contracts/Auction.sol#84-106):
        External calls:
        - token.transferFrom(topBidder,owner(),topBidAmount) (contracts/Auction.sol#102)
        - nft.transferFrom(msg.sender,topBidder,nftId) (contracts/Auction.sol#103)
        Event emitted after the call(s):
        - AuctionFinal(topBidAmount,nftId) (contracts/Auction.sol#105)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3

Auction.bid(uint256) (contracts/Auction.sol#60-75) uses timestamp for comparisons
        Dangerous comparisons:
        - require(bool,string)(block.timestamp < auctionEndTime,Auction has closed) (contracts/Auction.sol#62)
Auction.finalizeAuction() (contracts/Auction.sol#84-106) uses timestamp for comparisons
        Dangerous comparisons:
        - require(bool,string)(block.timestamp >= auctionEndTime,Auction time has not run out) (contracts/Auction.sol#85-88)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#block-timestamp

ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) uses assembly
        - INLINE ASM (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#408-410)
Address.verifyCallResult(bool,bytes,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#201-221) uses assembly
        - INLINE ASM (node_modules/@openzeppelin/contracts/utils/Address.sol#213-216)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#assembly-usage

Different versions of Solidity are used:
        - Version used: ['^0.8.0', '^0.8.1', '^0.8.4']
        - ^0.8.0 (node_modules/@openzeppelin/contracts/access/Ownable.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#4)
        - ^0.8.1 (node_modules/@openzeppelin/contracts/utils/Address.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Context.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Strings.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#4)
        - ^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#4)
        - ^0.8.4 (contracts/Auction.sol#2)
        - ^0.8.4 (contracts/NFT.sol#2)
        - ^0.8.4 (contracts/Token.sol#2)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#different-pragma-directives-are-used

Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/access/Ownable.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#4) allows old versions
Pragma version^0.8.1 (node_modules/@openzeppelin/contracts/utils/Address.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Context.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Strings.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#4) allows old versions
solc-0.8.9 is not recommended for deployment
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-versions-of-solidity

Low level call in Address.sendValue(address,uint256) (node_modules/@openzeppelin/contracts/utils/Address.sol#60-65):
        - (success) = recipient.call{value: amount}() (node_modules/@openzeppelin/contracts/utils/Address.sol#63)
Low level call in Address.functionCallWithValue(address,bytes,uint256,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#128-139):
        - (success,returndata) = target.call{value: value}(data) (node_modules/@openzeppelin/contracts/utils/Address.sol#137)
Low level call in Address.functionStaticCall(address,bytes,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#157-166):
        - (success,returndata) = target.staticcall(data) (node_modules/@openzeppelin/contracts/utils/Address.sol#164)
Low level call in Address.functionDelegateCall(address,bytes,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#184-193):
        - (success,returndata) = target.delegatecall(data) (node_modules/@openzeppelin/contracts/utils/Address.sol#191)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls

Parameter Auction.bid(uint256)._bid (contracts/Auction.sol#60) is not in mixedCase
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#conformance-to-solidity-naming-conventions