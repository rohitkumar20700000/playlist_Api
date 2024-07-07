import React, { useState, useEffect, useRef } from 'react';

const Playlist = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      const firstTrack = tracks[0];
      if (firstTrack.preview_url) {
        setCurrentTrackIndex(0);
        audioRef.current.src = firstTrack.preview_url;
        audioRef.current.play();
      } else {
        console.warn('First track has no preview_url:', firstTrack);
      }
    }
  };

  const handleNextTrack = () => {
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < tracks.length) {
      const nextTrack = tracks[nextIndex];
      if (nextTrack.preview_url) {
        setCurrentTrackIndex(nextIndex);
        audioRef.current.src = nextTrack.preview_url;
        audioRef.current.play();
      } else {
        console.warn('Next track has no preview_url:', nextTrack);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleNextTrack);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleNextTrack);
      }
    };
  }, [currentTrackIndex, tracks]);

  return (
    <div>
      <button onClick={handlePlayAll}>Play All</button>
      <h2>Playlist</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={track.id} className={index === currentTrackIndex ? 'current-track' : ''}>
            <div className="track-info">
              <span>{track.name}</span>
              <span>{track.artists[0].name}</span>
            </div>
          </li>
        ))}
      </ul>
      {tracks.length > 0 && (
        <audio ref={audioRef} controls>
          Your browser does not support the audio element.
        </audio>
      )}
          <button className="my-playlist-btn" onClick={() => window.open('https://open.spotify.com/playlist/6MgVBaXgSiigos5VAj8QbD?utm_source=generator&theme=0', '_blank')}>
        + Playlist
      </button>  
    </div>
  );
};

export default Playlist;