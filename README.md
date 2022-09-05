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
* Bids can be made by anyone who both gives approval to the contract to send ERC20 tokens on it's behalf, but also have enough tokens owned by their account to 'approve' the bid.
* Once the time for the auction has elapsed, the owner can call finalizeAuction to complete the transaction

### Contract Stories
* Upon initializing the contract, the NFT, ERC20 token and contract hours is defined. These variables should not be able to be updated, but they should be accessible to read.
* The contract does not start until the startAuction function is called. This function cannot be called by anyone other than the contract deployer. The NFT must be made an operator of the NFT before NFT bidding can start, and the NFT deployer must also be the owner of the NFT.
* Token bidders must give approval to the contract for their tokens before they can make a bid. They must also have that balance in their account before they can make a bid.
* The bid function cannot be utilized before bidding has start or after bidding has ended.
* A function finalizeAuction must be created to end the bidding on the contract. The contract cannot be ended until the pre-defined time has passed.
* The owner and the NFT purchaser must receive their tokens and NFT respectively in order for the function to executed. Otherwise the transaction must revert. A descriptive error should be given explaining why the transaction failed.
* You should have an event emit when the Auction has started, when a bid is made, when a bid is withdrawn, when the auction has ended, including details on what token was sent to who and how much the owner received in ERC20 tokens.

## Test Cases
In a test file called Auction.js, please check for the following scenarios:

#### Deployments
* The contract is successfully deployed to the network
* The contract must have an auction time in hours, ERC20 token and NFT (plus ID) upon deployment

#### Starting the Auction
* The contract will successfully start when the proper conditions are met
* The deployer of the contract must have given the contract operator access and the contract deployer is the owner of the NFT
* The auction cannot be started by anyone other than the contract deployer
* Bidding cannot start until the auction has been started

#### Bidding
* Bidding cannot start until the auction has been started.
* A bid can be successfully made by a user who has successfully approved the contract to send ERC20 on their behalf and that they have enough tokens
* A user who has not approved the contract for ERC20 sending cannot send tokens
* A user who does not have enough ERC20 tokens cannot make a bid
When a new bidder makes a new max bid, their address and bid amount are recorded correctly
* A bid cannot be made after the bid time has elapsed

#### Ending the Contract
* The 'finalizeAuction' function cannot be called by non-owners
* The auction cannot be ended until the time has elapsed for the contract
* The auction successfully send the NFT to the max bidder and sends tokens to the Owner in the expected amounts
* The transfer will fail if the contract does not have access to the tokens or the owners no longer have access to their tokens or NFT
* The final transfer emits an event with the amount sent to the owner and the NFT sent to the user

## Hardhat Automation Requirements
When Automating Your Contract, please add tasks to your hardhat.config.js that can then do the following:

* Show who the highest bidder is and how much they bid
* Show what ERC20 token you are Bidding with, including the Token Address
* Show what NFT the contract is selling, including the NFT address and NFT ID
* Show how much time is left in the contract, returning the total number of seconds
* Update your README.md to explain how to use these functions are used

## Deployment to Goerli Test Network
We are also going to create a deployment file for our contract into the Goerli test network. It will have the following attributes:

* Network needs to deploy using a Goerli Testnet node
    * You will need to update your hardhat.config.js to allow for this
* Create a file called DeployAuction.js to deploy your ERC20, ERC721 and your Auction to the network
    * NOTE: You do not need to run the contract once deployed
* Update your README.md with the transaction hash of your successful deployment to show an updated example of your file
* You must not push any of your secrets to your github repository
* Flatten your contract and update it to remove extra SPDX references. Save it to a file called verification.tx
* Provide a link to your verified contract in your README.md file. Provide the flattened contract in the top level of your repo, called Auction.sol.flatten

## Additional Development Requirements
When developing this contract, please do the following:

* Have your tests run every time your commit your code
* Save a version of your pre-commit file called .pre-commit.sample in the top level of your repo
* Setup your linter and clean your environment based on the ‘recommended’ linting practices. This setup should exist in a file called .solhint.json
* Setup Test Coverage and run it on your tests. Post the outputs in your README.md under a section called Test Coverage (Only the table with test coverage percentages)
* Use Natspec to document your code, including:
    * Title
    * Author
    * Dev notes for each function and the contracts

* Do not push any secrets to your github repository
* Run Slither locally and submit a copy of your slither output (human readable) in your README.md

## Output of test coverage

Version
=======
> solidity-coverage: v0.7.21

Instrumenting for coverage...
=============================

> Auction.sol
> NFT.sol
> Token.sol

Compilation:
============

Compiled 19 Solidity files successfully

Network Info
============
> HardhatEVM: v2.10.2
> network:    hardhat

Compiled 19 Solidity files successfully


  Auction
    Deployment
      ✔ The contract is successfully deployed to the network
      ✔ The contract must have an auction time in hours, ERC20 token and NFT (plus ID) upon deployment
    Starting the Auction
      ✔ The auction will successfully start when the proper conditions are met
      ✔ The deployer of the contract must have given the contract operator access and the contract deployer is the owner of the NFT
      ✔ The auction cannot be started by anyone other than the contract deployer
    Bidding
      ✔ Bidding cannot start until the auction has been started
      ✔ A bid can be successfully made by a user who has successfully approved the contract to send ERC20 on their behalf and that they have enough tokens (46ms)
      ✔ A user who has not approved the contract for ERC20 sending cannot send tokens
      ✔ A user who does not have enough ERC20 tokens cannot make a bid
      ✔ When a new bidder makes a new max bid, their address and bid amount are recorded correctly (85ms)
fast forwarding 24 hours...
      ✔ A bid cannot be made after the bid time has elapsed (46ms)
    Ending the contract
      ✔ The 'finalizeAuction' function cannot be called by non-owners
      ✔ The auction cannot be ended until the time has elapsed for the contract
      ✔ The auction successfully send the NFT to the max bidder and sends tokens to the Owner in the expected amounts
      ✔ The transfer will fail if the contract does not have access to the tokens or the owners no longer have access to their tokens or NFT
      ✔ The final transfer emits an event with the amount sent to the owner and the NFT sent to the user


  16 passing (3s)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
 contracts/   |    83.87 |       75 |    77.78 |    86.49 |                |
  Auction.sol |      100 |    85.71 |      100 |      100 |                |
  NFT.sol     |    55.56 |        0 |       50 |    55.56 |    25,36,37,55 |
  Token.sol   |       50 |      100 |       50 |       50 |             16 |
--------------|----------|----------|----------|----------|----------------|
All files     |    83.87 |       75 |    77.78 |    86.49 |                |
--------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json

## Output of Slither
'npx hardhat compile --force' running
Compiled 19 Solidity files successfully

<s> [webpack.Progress] 0% 

<s> [webpack.Progress] 1% setup before run
<s> [webpack.Progress] 1% setup before run NodeEnvironmentPlugin
<s> [webpack.Progress] 1% setup before run
<s> [webpack.Progress] 2% setup run
<s> [webpack.Progress] 2% setup run
<s> [webpack.Progress] 4% setup normal module factory
<s> [webpack.Progress] 4% setup normal module factory
<s> [webpack.Progress] 5% setup context module factory
<s> [webpack.Progress] 5% setup context module factory
<s> [webpack.Progress] 6% setup before compile
<s> [webpack.Progress] 6% setup before compile ProgressPlugin
<s> [webpack.Progress] 6% setup before compile
<s> [webpack.Progress] 7% setup compile
<s> [webpack.Progress] 7% setup compile ExternalsPlugin
<s> [webpack.Progress] 7% setup compile
<s> [webpack.Progress] 8% setup compilation
<s> [webpack.Progress] 8% setup compilation ArrayPushCallbackChunkFormatPlugin
<s> [webpack.Progress] 8% setup compilation JsonpChunkLoadingPlugin
<s> [webpack.Progress] 8% setup compilation StartupChunkDependenciesPlugin
<s> [webpack.Progress] 8% setup compilation ImportScriptsChunkLoadingPlugin
<s> [webpack.Progress] 8% setup compilation FetchCompileWasmPlugin
<s> [webpack.Progress] 8% setup compilation FetchCompileAsyncWasmPlugin
<s> [webpack.Progress] 8% setup compilation WorkerPlugin
<s> [webpack.Progress] 8% setup compilation SplitChunksPlugin
<s> [webpack.Progress] 8% setup compilation ResolverCachePlugin
<s> [webpack.Progress] 8% setup compilation HtmlWebpackPlugin
<s> [webpack.Progress] 8% setup compilation
<s> [webpack.Progress] 9% setup compilation
<s> [webpack.Progress] 9% setup compilation ProgressPlugin
<s> [webpack.Progress] 9% setup compilation vue-loader-plugin
<s> [webpack.Progress] 9% setup compilation DefinePlugin
<s> [webpack.Progress] 9% setup compilation ChunkPrefetchPreloadPlugin
<s> [webpack.Progress] 9% setup compilation JavascriptModulesPlugin
<s> [webpack.Progress] 9% setup compilation JsonModulesPlugin
<s> [webpack.Progress] 9% setup compilation AssetModulesPlugin
<s> [webpack.Progress] 9% setup compilation EntryPlugin
<s> [webpack.Progress] 9% setup compilation RuntimePlugin
<s> [webpack.Progress] 9% setup compilation InferAsyncModulesPlugin
<s> [webpack.Progress] 9% setup compilation DataUriPlugin
<s> [webpack.Progress] 9% setup compilation FileUriPlugin
<s> [webpack.Progress] 9% setup compilation CompatibilityPlugin
<s> [webpack.Progress] 9% setup compilation HarmonyModulesPlugin
<s> [webpack.Progress] 9% setup compilation AMDPlugin
<s> [webpack.Progress] 9% setup compilation RequireJsStuffPlugin
<s> [webpack.Progress] 9% setup compilation CommonJsPlugin
<s> [webpack.Progress] 9% setup compilation LoaderPlugin
<s> [webpack.Progress] 9% setup compilation LoaderPlugin
<s> [webpack.Progress] 9% setup compilation NodeStuffPlugin
<s> [webpack.Progress] 9% setup compilation APIPlugin
<s> [webpack.Progress] 9% setup compilation ExportsInfoApiPlugin
<s> [webpack.Progress] 9% setup compilation WebpackIsIncludedPlugin
<s> [webpack.Progress] 9% setup compilation ConstPlugin
<s> [webpack.Progress] 9% setup compilation UseStrictPlugin
<s> [webpack.Progress] 9% setup compilation RequireIncludePlugin
<s> [webpack.Progress] 9% setup compilation RequireEnsurePlugin
<s> [webpack.Progress] 9% setup compilation RequireContextPlugin
<s> [webpack.Progress] 9% setup compilation ImportPlugin
<s> [webpack.Progress] 9% setup compilation RequireContextPlugin
<s> [webpack.Progress] 9% setup compilation SystemPlugin
<s> [webpack.Progress] 9% setup compilation ImportMetaPlugin
<s> [webpack.Progress] 9% setup compilation URLPlugin
<s> [webpack.Progress] 9% setup compilation DefaultStatsFactoryPlugin
<s> [webpack.Progress] 9% setup compilation DefaultStatsPresetPlugin
<s> [webpack.Progress] 9% setup compilation DefaultStatsPrinterPlugin
<s> [webpack.Progress] 9% setup compilation JavascriptMetaInfoPlugin
<s> [webpack.Progress] 9% setup compilation EnsureChunkConditionsPlugin
<s> [webpack.Progress] 9% setup compilation RemoveEmptyChunksPlugin
<s> [webpack.Progress] 9% setup compilation MergeDuplicateChunksPlugin
<s> [webpack.Progress] 9% setup compilation FlagIncludedChunksPlugin
<s> [webpack.Progress] 9% setup compilation SideEffectsFlagPlugin
<s> [webpack.Progress] 9% setup compilation FlagDependencyExportsPlugin
<s> [webpack.Progress] 9% setup compilation FlagDependencyUsagePlugin
<s> [webpack.Progress] 9% setup compilation InnerGraphPlugin
<s> [webpack.Progress] 9% setup compilation MangleExportsPlugin
<s> [webpack.Progress] 9% setup compilation ModuleConcatenationPlugin
<s> [webpack.Progress] 9% setup compilation NoEmitOnErrorsPlugin
<s> [webpack.Progress] 9% setup compilation RealContentHashPlugin
<s> [webpack.Progress] 9% setup compilation WasmFinalizeExportsPlugin
<s> [webpack.Progress] 9% setup compilation DeterministicModuleIdsPlugin
<s> [webpack.Progress] 9% setup compilation DeterministicChunkIdsPlugin
<s> [webpack.Progress] 9% setup compilation DefinePlugin
<s> [webpack.Progress] 9% setup compilation TerserPlugin
<s> [webpack.Progress] 9% setup compilation TemplatedPathPlugin
<s> [webpack.Progress] 9% setup compilation RecordIdsPlugin
<s> [webpack.Progress] 9% setup compilation WarnCaseSensitiveModulesPlugin
<s> [webpack.Progress] 9% setup compilation
<s> [webpack.Progress] 10% building
<s> [webpack.Progress] 10% building 0/1 entries 0/0 dependencies 0/0 modules
<s> [webpack.Progress] 10% building import loader ./node_modules/vue-loader/lib/index.js
<s> [webpack.Progress] 10% building 0/1 entries 5/6 dependencies 0/5 modules
<s> [webpack.Progress] 10% building import loader ./node_modules/vue-loader/lib/loaders/pitcher.js
<s> [webpack.Progress] 10% building 0/1 entries 14/15 dependencies 2/12 modules
<s> [webpack.Progress] 10% building import loader ./node_modules/vue-loader/lib/loaders/templateLoader.js
<s> [webpack.Progress] 10% building 0/1 entries 14/15 dependencies 2/12 modules
<s> [webpack.Progress] 10% building import loader ./node_modules/vue-style-loader/index.js
<s> [webpack.Progress] 10% building import loader ./node_modules/css-loader/dist/cjs.js
<s> [webpack.Progress] 10% building 0/1 entries 26/29 dependencies 9/23 modules
<s> [webpack.Progress] 10% building import loader ./node_modules/vue-loader/lib/loaders/stylePostLoader.js
<s> [webpack.Progress] 10% building 0/1 entries 43/43 dependencies 9/35 modules
<s> [webpack.Progress] 65% building 1/1 entries 66/66 dependencies 53/53 modules
<s> [webpack.Progress] 65% building
<s> [webpack.Progress] 69% building finish
<s> [webpack.Progress] 69% building finish
<s> [webpack.Progress] 70% sealing finish module graph
<s> [webpack.Progress] 70% sealing finish module graph ResolverCachePlugin
<s> [webpack.Progress] 70% sealing finish module graph InferAsyncModulesPlugin
<s> [webpack.Progress] 70% sealing finish module graph FlagDependencyExportsPlugin
<s> [webpack.Progress] 70% sealing finish module graph InnerGraphPlugin
<s> [webpack.Progress] 70% sealing finish module graph WasmFinalizeExportsPlugin
<s> [webpack.Progress] 70% sealing finish module graph
<s> [webpack.Progress] 70% sealing plugins
<s> [webpack.Progress] 70% sealing plugins WarnCaseSensitiveModulesPlugin
<s> [webpack.Progress] 70% sealing plugins
<s> [webpack.Progress] 71% sealing dependencies optimization
<s> [webpack.Progress] 71% sealing dependencies optimization SideEffectsFlagPlugin
<s> [webpack.Progress] 71% sealing dependencies optimization FlagDependencyUsagePlugin
<s> [webpack.Progress] 71% sealing dependencies optimization
<s> [webpack.Progress] 71% sealing after dependencies optimization
<s> [webpack.Progress] 71% sealing after dependencies optimization
<s> [webpack.Progress] 72% sealing chunk graph
<s> [webpack.Progress] 72% sealing chunk graph
<s> [webpack.Progress] 73% sealing after chunk graph
<s> [webpack.Progress] 73% sealing after chunk graph
<s> [webpack.Progress] 73% sealing optimizing
<s> [webpack.Progress] 73% sealing optimizing
<s> [webpack.Progress] 74% sealing module optimization
<s> [webpack.Progress] 74% sealing module optimization
<s> [webpack.Progress] 75% sealing after module optimization
<s> [webpack.Progress] 75% sealing after module optimization
<s> [webpack.Progress] 75% sealing chunk optimization
<s> [webpack.Progress] 75% sealing chunk optimization EnsureChunkConditionsPlugin
<s> [webpack.Progress] 75% sealing chunk optimization RemoveEmptyChunksPlugin
<s> [webpack.Progress] 75% sealing chunk optimization MergeDuplicateChunksPlugin
<s> [webpack.Progress] 75% sealing chunk optimization SplitChunksPlugin
<s> [webpack.Progress] 75% sealing chunk optimization RemoveEmptyChunksPlugin
<s> [webpack.Progress] 75% sealing chunk optimization
<s> [webpack.Progress] 76% sealing after chunk optimization
<s> [webpack.Progress] 76% sealing after chunk optimization
<s> [webpack.Progress] 77% sealing module and chunk tree optimization
<s> [webpack.Progress] 77% sealing module and chunk tree optimization PersistentChildCompilerSingletonPlugin
<s> [webpack.Progress] 77% sealing module and chunk tree optimization
<s> [webpack.Progress] 77% sealing after module and chunk tree optimization
<s> [webpack.Progress] 77% sealing after module and chunk tree optimization
<s> [webpack.Progress] 78% sealing chunk modules optimization
<s> [webpack.Progress] 78% sealing chunk modules optimization ModuleConcatenationPlugin
<s> [webpack.Progress] 78% sealing chunk modules optimization
<s> [webpack.Progress] 78% sealing after chunk modules optimization
<s> [webpack.Progress] 78% sealing after chunk modules optimization
<s> [webpack.Progress] 79% sealing module reviving
<s> [webpack.Progress] 79% sealing module reviving RecordIdsPlugin
<s> [webpack.Progress] 79% sealing module reviving
<s> [webpack.Progress] 80% sealing before module ids
<s> [webpack.Progress] 80% sealing before module ids
<s> [webpack.Progress] 80% sealing module ids
<s> [webpack.Progress] 80% sealing module ids DeterministicModuleIdsPlugin
<s> [webpack.Progress] 80% sealing module ids
<s> [webpack.Progress] 81% sealing module id optimization
<s> [webpack.Progress] 81% sealing module id optimization
<s> [webpack.Progress] 82% sealing module id optimization
<s> [webpack.Progress] 82% sealing module id optimization
<s> [webpack.Progress] 82% sealing chunk reviving
<s> [webpack.Progress] 82% sealing chunk reviving RecordIdsPlugin
<s> [webpack.Progress] 82% sealing chunk reviving
<s> [webpack.Progress] 83% sealing before chunk ids
<s> [webpack.Progress] 83% sealing before chunk ids
<s> [webpack.Progress] 84% sealing chunk ids
<s> [webpack.Progress] 84% sealing chunk ids DeterministicChunkIdsPlugin
<s> [webpack.Progress] 84% sealing chunk ids
<s> [webpack.Progress] 84% sealing chunk id optimization
<s> [webpack.Progress] 84% sealing chunk id optimization FlagIncludedChunksPlugin
<s> [webpack.Progress] 84% sealing chunk id optimization
<s> [webpack.Progress] 85% sealing after chunk id optimization
<s> [webpack.Progress] 85% sealing after chunk id optimization
<s> [webpack.Progress] 86% sealing record modules
<s> [webpack.Progress] 86% sealing record modules RecordIdsPlugin
<s> [webpack.Progress] 86% sealing record modules
<s> [webpack.Progress] 86% sealing record chunks
<s> [webpack.Progress] 86% sealing record chunks RecordIdsPlugin
<s> [webpack.Progress] 86% sealing record chunks
<s> [webpack.Progress] 87% sealing module hashing
<s> [webpack.Progress] 87% sealing module hashing
<s> [webpack.Progress] 87% sealing code generation
<s> [webpack.Progress] 87% sealing code generation
<s> [webpack.Progress] 88% sealing runtime requirements
<s> [webpack.Progress] 88% sealing runtime requirements
<s> [webpack.Progress] 89% sealing hashing
<s> [webpack.Progress] 89% sealing hashing
<s> [webpack.Progress] 89% sealing after hashing
<s> [webpack.Progress] 89% sealing after hashing
<s> [webpack.Progress] 90% sealing record hash
<s> [webpack.Progress] 90% sealing record hash
<s> [webpack.Progress] 91% sealing module assets processing
<s> [webpack.Progress] 91% sealing module assets processing
<s> [webpack.Progress] 91% sealing chunk assets processing
<s> [webpack.Progress] 91% sealing chunk assets processing
<s> [webpack.Progress] 92% sealing asset processing
<s> [webpack.Progress] 92% sealing asset processing PersistentChildCompilerSingletonPlugin
<s> [webpack.Progress] 92% sealing asset processing TerserPlugin
<s> [webpack.Progress] 92% sealing asset processing HtmlWebpackPlugin
<s> [webpack.Progress] 92% sealing asset processing RealContentHashPlugin
<s> [webpack.Progress] 92% sealing asset processing
<s> [webpack.Progress] 93% sealing after asset optimization
<s> [webpack.Progress] 93% sealing after asset optimization
<s> [webpack.Progress] 93% sealing recording
<s> [webpack.Progress] 93% sealing recording
<s> [webpack.Progress] 94% sealing after seal
<s> [webpack.Progress] 94% sealing after seal
<s> [webpack.Progress] 95% emitting emit
<s> [webpack.Progress] 95% emitting emit
<s> [webpack.Progress] 98% emitting after emit
<s> [webpack.Progress] 98% emitting after emit SizeLimitsPlugin
<s> [webpack.Progress] 98% emitting after emit
<s> [webpack.Progress] 99% done plugins
<s> [webpack.Progress] 99% done plugins
<s> [webpack.Progress] 99% 

<s> [webpack.Progress] 99% cache store build dependencies
<s> [webpack.Progress] 99% cache store build dependencies
<s> [webpack.Progress] 99% cache begin idle
<s> [webpack.Progress] 99% cache begin idle
<s> [webpack.Progress] 100% 

<s> [webpack.Progress] 99% cache shutdown
<s> [webpack.Progress] 99% cache shutdown
<s> [webpack.Progress] 100% 



Contract locking ether found:
	Contract Auction (contracts/Auction.sol#12-89) has payable functions:
	 - Auction.bid(uint256) (contracts/Auction.sol#77-81)
	But does not have a function to withdraw the ether
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#contracts-that-lock-ether

ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) ignores return value by IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#401-412)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unused-return

Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).retval (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#401)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) potentially used before declaration: retval == IERC721Receiver.onERC721Received.selector (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#402)
Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).reason (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#403)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) potentially used before declaration: reason.length == 0 (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#404)
Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).reason (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#403)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#394-416) potentially used before declaration: revert(uint256,uint256)(32 + reason,mload(uint256)(reason)) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#409)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#pre-declaration-usage-of-local-variables

Reentrancy in Auction.finalizeAuction() (contracts/Auction.sol#83-88):
	External calls:
	- tokensHaveTransferred = IERC20(token).transferFrom(topBidder,msg.sender,topBidAmount) (contracts/Auction.sol#84)
	- IERC721(nft).safeTransferFrom(msg.sender,topBidder,nftId) (contracts/Auction.sol#86)
	Event emitted after the call(s):
	- auctionEnded(topBidder,token,topBidAmount) (contracts/Auction.sol#87)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3

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
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#4)
	- ^0.8.1 (node_modules/@openzeppelin/contracts/utils/Address.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Context.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Counters.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Strings.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#4)
	- ^0.8.0 (contracts/Auction.sol#2)
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
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#4) allows old versions
Pragma version^0.8.1 (node_modules/@openzeppelin/contracts/utils/Address.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Context.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Counters.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Strings.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#4) allows old versions
Pragma version^0.8.0 (contracts/Auction.sol#2) allows old versions
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

Event AuctionauctionStarted() (contracts/Auction.sol#29) is not in CapWords
Event AuctionbidMade(address,uint256) (contracts/Auction.sol#30) is not in CapWords
Event AuctionauctionEnded(address,IERC20,uint256) (contracts/Auction.sol#31) is not in CapWords
Parameter TurdNFT.transfer(uint256,address)._tokenId (contracts/NFT.sol#35) is not in mixedCase
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#conformance-to-solidity-naming-conventions

PoopToken.constructor() (contracts/Token.sol#10-12) uses literals with too many digits:
	- _mint(msg.sender,10000000 * 10 ** decimals()) (contracts/Token.sol#11)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#too-many-digits

Auction.auctionFinalized (contracts/Auction.sol#18) is never used in Auction (contracts/Auction.sol#12-89)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unused-state-variable

Auction.auctionFinalized (contracts/Auction.sol#18) should be constant
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#state-variables-that-could-be-declared-constant

renounceOwnership() should be declared external:
	- Ownable.renounceOwnership() (node_modules/@openzeppelin/contracts/access/Ownable.sol#61-63)
transferOwnership(address) should be declared external:
	- Ownable.transferOwnership(address) (node_modules/@openzeppelin/contracts/access/Ownable.sol#69-72)
name() should be declared external:
	- ERC20.name() (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#62-64)
symbol() should be declared external:
	- ERC20.symbol() (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#70-72)
totalSupply() should be declared external:
	- ERC20.totalSupply() (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#94-96)
balanceOf(address) should be declared external:
	- ERC20.balanceOf(address) (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#101-103)
transfer(address,uint256) should be declared external:
	- ERC20.transfer(address,uint256) (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#113-117)
approve(address,uint256) should be declared external:
	- ERC20.approve(address,uint256) (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#136-140)
transferFrom(address,address,uint256) should be declared external:
	- ERC20.transferFrom(address,address,uint256) (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#158-167)
increaseAllowance(address,uint256) should be declared external:
	- ERC20.increaseAllowance(address,uint256) (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#181-185)
decreaseAllowance(address,uint256) should be declared external:
	- ERC20.decreaseAllowance(address,uint256) (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#201-210)
name() should be declared external:
	- ERC721.name() (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#79-81)
symbol() should be declared external:
	- ERC721.symbol() (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#86-88)
tokenURI(uint256) should be declared external:
	- ERC721.tokenURI(uint256) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#93-98)
approve(address,uint256) should be declared external:
	- ERC721.approve(address,uint256) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#112-122)
setApprovalForAll(address,bool) should be declared external:
	- ERC721.setApprovalForAll(address,bool) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#136-138)
safeTransferFrom(address,address,uint256) should be declared external:
	- ERC721.safeTransferFrom(address,address,uint256) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#164-170)
tokenOfOwnerByIndex(address,uint256) should be declared external:
	- ERC721Enumerable.tokenOfOwnerByIndex(address,uint256) (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#37-40)
tokenByIndex(uint256) should be declared external:
	- ERC721Enumerable.tokenByIndex(uint256) (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#52-55)
mint(address,uint256) should be declared external:
	- PoopToken.mint(address,uint256) (contracts/Token.sol#15-17)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external
. analyzed (19 contracts with 78 detectors), 58 result(s) found