import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import Player from './Player';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateValue } from "./StateProvider"

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useStateValue();
  // const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token

    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        if (user) {
          dispatch({
            type: 'SET_USER',
            user: user
          })
        } else {
          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
      })

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      })

      spotify.getPlaylist('04fNGaCLI6v4JGbmkajfYi').then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      })
    }
  }, []);

  return (
    <div className="App">
      {
        token ? (
          <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
