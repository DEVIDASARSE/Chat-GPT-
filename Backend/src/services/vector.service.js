// Import the Pinecone library
const{ Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const cohortChatGptIndex = pc.index('chat-gpt')

// vector structure: [{vectors: [0.1,0.2,0.3], metadata: {userId: '1234', chatId: '5678'}, messageId: 'abcd'}] find karta hai vector 
async function createMemory({vectors, metadata, messageId}) {
    await cohortChatGptIndex.upsert([{
        id: messageId,
        values: vectors,
        metadata
    }])
}

async function queryMemory({queryVector, topK = 5, metadata}) {
    const data = await cohortChatGptIndex.query({
        vector: queryVector,
        topK, // Use the `topK` parameter instead of undefined `limit`
        filter: metadata ? {metadata} : undefined,
        includeMetadata: true// jo meta data ke sath memory create kiya hai wo wapis leker ana hai
    });
  return data.matches; 
}

module.exports = {
    createMemory,
    queryMemory
};