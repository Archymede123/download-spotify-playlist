//packages

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components 
import PlaylistsListing from './PlaylistsListing'
import DownloadPlaylist from './DownloadPlaylist';
import HoursCounter from './HoursCounter.js';
import Filter from './Filter';
import PlaylistCounter from './PlaylistCounter';
import LoginPage from './LoginPage';
import PlaylistPage from './PlaylistPage';

// css
import '../css/App.css';

// import querystring from 'query-string';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: '',
      filterRating: 0,
    }

    this.resetRateFiltering = this.resetRateFiltering.bind(this);
    this.addPlaylistRating = this.addPlaylistRating.bind(this);
  }

  loadSpotifyData = (data) => {
    this.setState({
      playlists: data.playlists,
      user: data.user
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
    console.log(playlists)
    this.setState({ playlists })
  }

  updateFilteredRating = (rating) => {
    let filterRating = this.state.filterRating
    filterRating = rating
    this.setState({ filterRating })
  }

  resetRateFiltering = (event) => {
    this.setState({ filterRating: 0 })
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
  }

  componentDidUpdate() {
    localStorage.setItem(
      "user",
      JSON.stringify(this.state.user))

    localStorage.setItem(
      "playlists",
      JSON.stringify(this.state.playlists))
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
                  render={(props) => <PlaylistsListing {...props}
                    data={this.state}
                    addTag={this.addTag}
                    addPlaylistRating={this.addPlaylistRating}
                  />}
                />
                <Route
                  exact
                  path="/:playlistId"
                  render={(props) => <PlaylistPage {...props} playlists={this.state.playlists} />}
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
