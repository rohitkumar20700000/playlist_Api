import { useEffect, useState } from 'react';

const SpotifyPlayer = ({ token, onPlayerReady }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const playerInstance = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => { cb(token); },
        volume: 0.5,
      });

      setPlayer(playerInstance);

      playerInstance.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        onPlayerReady(device_id);
      });

      playerInstance.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      playerInstance.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });

      playerInstance.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });

      playerInstance.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });

      playerInstance.addListener('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });

      playerInstance.connect();
    };
  }, [token]);

  return null;
};

export default SpotifyPlayer;