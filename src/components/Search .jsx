import React, { useState } from 'react';
import { searchTracks, getToken } from '../services/Spotify';

const Search = ({ onAddTrack }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const token = await getToken();
      const tracks = await searchTracks(query, token);
      setResults(tracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a track"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((track) => (
          <li key={track.id}>
            <div className="track-info">
              <span>{track.name}</span>
              <span>{track.artists[0].name}</span>
            </div>
            {track.preview_url ? (
              <button onClick={() => onAddTrack && onAddTrack(track)}>Add to Playlist</button>
            ) : (
              <span>No preview available</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;