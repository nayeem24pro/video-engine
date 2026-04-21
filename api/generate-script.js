import axios from 'axios';

export default async function generateScript(topic) {
  const prompt = `Write a 30-second faceless video script about ${topic}. 
  Format: 3 short sentences. No speaker name. Engaging hook.`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );
  
  return response.data.candidates[0].content.parts[0].text;
}
