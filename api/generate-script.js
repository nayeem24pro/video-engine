import axios from 'axios';

// This is the handler Vercel expects for serverless functions
export default async function handler(req, res) {
  // 1. Only allow GET requests for this endpoint
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Get the topic from the query string, e.g., ?topic=motivation
  const topic = req.query.topic || 'motivation';

  // 3. Your original script generation logic
  const prompt = `Write a 30-second faceless video script about ${topic}. Format: 3 short sentences. No speaker name. Engaging hook.`;
  
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );
    
    const script = response.data.candidates[0].content.parts[0].text;
    
    // 4. Send a successful JSON response back to the client
    res.status(200).json({ topic, script });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ error: 'Failed to generate script' });
  }
}
