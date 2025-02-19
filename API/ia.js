const { OpenAI } = require("openai");

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = "485bc46dbab8482bbbe854126c077f05";


const api = new OpenAI({
  apiKey,
  baseURL,
});

async function generateAIResponse(userPrompt) {
  try {
      const completion = await api.chat.completions.create({
          model: "mistralai/Mistral-7B-Instruct-v0.2", 
          messages: [
              { role: "system", content: "Tu es une IA assistante." },
              { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 256,
      });

      return completion.choices[0].message.content; 
  } catch (error) {
      console.error("Erreur OpenAI:", error);
      return "Désolé, je ne peux pas répondre pour le moment.";
  }
}

module.exports = generateAIResponse;
