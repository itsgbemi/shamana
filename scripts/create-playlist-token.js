const {
  initializeHederaClient,
  logEnvStatus,
} = require('./hedera-utils.js');

const {
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} = require("@hashgraph/sdk");

async function createPlaylistTokens() {
  let client;
  
  try {
    const { client: hederaClient, operatorId, operatorKey } = initializeHederaClient();
    client = hederaClient;
    
    logEnvStatus();

    // Generate supply key for NFTs
    const nftSupplyKey = PrivateKey.generateECDSA();

    // Create the NFT token
    const nftCreate = new TokenCreateTransaction()
      .setTokenName("Playlist NFTs")
      .setTokenSymbol("PLST")
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(operatorId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(10000)
      .setSupplyKey(nftSupplyKey)
      .freezeWith(client);

    // Sign the transaction with the operator key
    const nftCreateTxSign = await nftCreate.sign(operatorKey);
    const nftCreateSubmit = await nftCreateTxSign.execute(client);
    const nftCreateRx = await nftCreateSubmit.getReceipt(client);

    // Get the NFT token ID
    const nftTokenId = nftCreateRx.tokenId;

    if (!nftTokenId) {
      throw new Error('Failed to create NFT token');
    }

    // Create the Fungible Token for rewards
    const ftCreate = new TokenCreateTransaction()
      .setTokenName("Playlist Points")
      .setTokenSymbol("POINTS")
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(0)
      .setInitialSupply(1000000) // 1 million initial supply
      .setTreasuryAccountId(operatorId)
      .setSupplyKey(operatorKey) // Use operator key for FT supply
      .freezeWith(client);

    // Sign the transaction with the operator key
    const ftCreateTxSign = await ftCreate.sign(operatorKey);
    const ftCreateSubmit = await ftCreateTxSign.execute(client);
    const ftCreateRx = await ftCreateSubmit.getReceipt(client);

    // Get the FT token ID
    const ftTokenId = ftCreateRx.tokenId;

    if (!ftTokenId) {
      throw new Error('Failed to create FT token');
    }

    console.log(`✅ Created NFT token with ID: ${nftTokenId}`);
    console.log(`✅ Created FT token with ID: ${ftTokenId}`);
    console.log(`🔑 NFT Supply key: ${nftSupplyKey.toString()}`);
    
    console.log('\n📋 Add these to your environment variables:');
    console.log(`HEDERA_NFT_TOKEN_ID=${nftTokenId}`);
    console.log(`HEDERA_FT_TOKEN_ID=${ftTokenId}`);
    console.log(`HEDERA_NFT_SUPPLY_KEY=${nftSupplyKey.toString()}`);

  } catch (error) {
    console.error('❌ Error creating playlist tokens:', error);
    process.exit(1);
  } finally {
    if (client) {
      try {
        await client.close();
      } catch (e) {
        console.error('Error closing Hedera client:', e);
      }
    }
  }
}

createPlaylistTokens();