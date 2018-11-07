//packages

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components 
import Homepage from './Homepage'
import LoginPage from './LoginPage';
import PlaylistPage from './PlaylistPage';
import BlindtestGame from './blindtest/BlindtestGame';

// css
import '../css/App.css';


// import querystring from 'query-string';

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  loadSpotifyData = (data) => {
    this.setState({
      playlists: data.playlists,
      user: data.user,
      access_token: data.access_token
    })
  }

  addTag = (index, tag) => {
    let playlists = this.state.playlists
    playlists[index].tags ? playlists[index].tags.push(tag)
      : playlists[index].tags = [tag]
    this.setState({ playlists })
  }

  addPlaylistRating = (index, rating) => {
    let playlists = this.state.playlists
    playlists.find(playlist => playlist.index === index).rating = rating
    this.setState({ playlists })
  }

  componentDidMount() {
    const localStorageUserRef = localStorage.getItem('user')
    if (localStorageUserRef) {
      this.setState({ user: JSON.parse(localStorageUserRef) })
    }

    const localStoragePlaylistsRef = localStorage.getItem('playlists')
    if (localStoragePlaylistsRef) {
      this.setState({ playlists: JSON.parse(localStoragePlaylistsRef) })
    }

    const localStorageTokenRef = localStorage.getItem('access_token')
    if (localStorageTokenRef) {
      this.setState({ access_token: JSON.parse(localStorageTokenRef) })
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      "user",
      JSON.stringify(this.state.user))

    localStorage.setItem(
      "playlists",
      JSON.stringify(this.state.playlists))

    localStorage.setItem(
      "access_token",
      JSON.stringify(this.state.access_token))
  }

  render() {
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => <Homepage {...props}
                    data={this.state}
                    addTag={this.addTag}
                    addPlaylistRating={this.addPlaylistRating}
                  />}
                />
                <Route
                  exact
                  path="/playlist/:playlistId"
                  render={(props) => <PlaylistPage {...props}
                    playlists={this.state.playlists}
                    access_token={this.state.access_token}
                  />}
                />
                <Route
                  exact
                  path="/blindtest"
                  render={(props) => <BlindtestGame {...props}
                    access_token={this.state.access_token}
                  />}
                />
              </Switch>
            </BrowserRouter>
          </div> : <LoginPage loadSpotifyData={this.loadSpotifyData} />
        }
      </div>
    );
  }
}

export default App;
