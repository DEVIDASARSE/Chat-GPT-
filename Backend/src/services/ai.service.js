const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY // Ensure your API key is provided here
})

async function generateResponse(content) {
    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
        contents: content
    });
 
    return response.text;
}


//embedding generate karne ke liye bhi ai service chahiye hogi jise ham yaha per add karenge

async function generateVector(content){

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config:{
            outputDimensionality:768
        }
    })
    return response.embeddings[0].values; // Return the vector values   
}

module.exports = {  
    generateResponse,
    generateVector
};