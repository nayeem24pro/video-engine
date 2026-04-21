import { Composition, Sequence, AbsoluteFill, Audio, Img } from 'remotion';
import { useState, useEffect } from 'react';

export const MyVideo = ({ scriptText, imageUrls, audioUrl }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
      {imageUrls?.map((url, index) => (
        <Sequence from={index * 3} durationInFrames={90}>
          <Img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Sequence>
      ))}
      <div style={{ position: 'absolute', bottom: 100, color: 'white', fontSize: 40, textAlign: 'center', padding: 20 }}>
        {scriptText}
      </div>
      {audioUrl && <Audio src={audioUrl} />}
    </AbsoluteFill>
  );
};

export const Root = () => {
  return (
    <Composition
      id="FacelessVideo"
      component={MyVideo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
