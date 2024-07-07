import axios from 'axios';

const CLIENT_ID = 'e083fe9c5cc44738baa08cb9ccf53951';
const CLIENT_SECRET = 'ceab828ac9114b77a69117a3e7489476';
const REDIRECT_URI = 'http://localhost:3000/callback';

export const getToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);

  const response = await axios.post('https://accounts.spotify.com/api/token', params);
  return response.data.access_token;
};

export const searchTracks = async (query, token) => {
  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      q: query,
      type: 'track'
    }
  });
  console.log('Tracks:', response.data.tracks.items); // Debugging log
  return response.data.tracks.items;
};