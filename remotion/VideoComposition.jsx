import { Composition, Sequence, AbsoluteFill, Audio, Img } from 'remotion';

// Main video component
export const MyVideo = ({ scriptText, imageUrls, audioUrl }) => {
  // Split script into sentences for timing (approx 3-4 seconds each)
  const sentences = scriptText?.split(/[.!?]+/).filter(s => s.trim().length > 0) || [];
  const durationPerSentence = 90; // 3 seconds at 30fps
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
      {/* Background images/videos */}
      {imageUrls?.map((url, index) => (
        <Sequence from={index * durationPerSentence} durationInFrames={durationPerSentence}>
          <Img 
            src={url} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: 0.8
            }} 
          />
        </Sequence>
      ))}
      
      {/* Text overlay */}
      {sentences.map((sentence, idx) => (
        <Sequence from={idx * durationPerSentence} durationInFrames={durationPerSentence}>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            padding: '0 20px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 10,
            maxWidth: '80%',
            margin: '0 auto'
          }}>
            {sentence.trim()}.
          </div>
        </Sequence>
      ))}
      
      {/* Audio */}
      {audioUrl && <Audio src={audioUrl} />}
    </AbsoluteFill>
  );
};

// Root component that registers the composition
export const Root = () => {
  // Calculate total duration: 3 seconds per sentence + 1 extra second buffer
  const estimatedSentences = 3; // fallback, but actual will come from props
  const durationInFrames = 90 * (estimatedSentences + 1);
  
  return (
    <Composition
      id="FacelessVideo"
      component={MyVideo}
      durationInFrames={900} // 30 seconds at 30fps (adjust as needed)
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        scriptText: "Default script. This is a faceless video engine.",
        imageUrls: [],
        audioUrl: null
      }}
    />
  );
};
