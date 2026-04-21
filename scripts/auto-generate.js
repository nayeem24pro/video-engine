import { bundle } from '@remotion/bundler';
import { renderMedia } from '@remotion/renderer';
import generateScript from '../api/generate-script.js';
import axios from 'axios';

async function getStockImages(keyword) {
  const res = await axios.get(`https://api.pexels.com/videos/search?query=${keyword}&per_page=3`, {
    headers: { Authorization: process.env.PEXELS_API_KEY }
  });
  return res.data.videos.map(v => v.video_files[0].link);
}

async function textToSpeech(text) {
  // Edge TTS free (no key)
  const response = await axios.post('https://api.tts.quest/v1/edge', { text, voice: 'en-US-JennyNeural' });
  return response.data.mp3Url;
}

async function main() {
  const topic = 'motivation'; // or pull from trending API
  
  const script = await generateScript(topic);
  console.log('Script:', script);
  
  const images = await getStockImages(topic);
  const audio = await textToSpeech(script);
  
  const bundleLocation = await bundle({ entryPoint: './remotion/index.js' });
  await renderMedia({
    codec: 'h264',
    composition: 'FacelessVideo',
    serveUrl: bundleLocation,
    outputLocation: `output/video_${Date.now()}.mp4`,
    inputProps: { scriptText: script, imageUrls: images, audioUrl: audio }
  });
  
  console.log('Video rendered!');
}

main();
