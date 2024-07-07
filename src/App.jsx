import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search ';
import Playlist from './components/Playlist';
import { getToken } from './services/Spotify';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };

    fetchToken();
  }, []);

  const handleAddTrack = (track) => {
    if (track.preview_url) {
      setTracks([...tracks, track]);
    } else {
      console.warn('Track has no preview_url:', track);
    }
  };

  return (
    <div className="container">
      <h1>Music Playlist Creator</h1>
      <Search onAddTrack={handleAddTrack} />
      <Playlist tracks={tracks} />
    </div>
  );
};

export default App;