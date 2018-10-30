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

// js 

import { fetchPlaylistInfos, fetchPlaylistData } from '../api/fetchData'

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

    let accessToken = new URLSearchParams(window.location.search).get('access_token');
    if (!accessToken) return;

    fetchPlaylistInfos(accessToken).then(data => {
      this.setState({
        user: {
          name: data.display_name
        }
      })
    })

    fetchPlaylistData(accessToken).then(playlists => {
      this.setState({
        playlists: playlists.map((item, index) => {
          return {
            name: item.name,
            songs: item.trackDatas,
            imageUrl: item.images[0].url,
            rating: 0,
            index: index
          }
        }
        )
      })
    })
  }

  render() {
    let playlistsToRender =
      this.state.user &&
        this.state.playlists
        ? this.state.playlists.filter(playlist => {
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
          let matchesSong = playlist.songs.find(song =>
            song.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
          return matchesPlaylist || matchesSong
        }).filter(playlist => {
          let matcheRating;
          if (this.state.filterRating !== 0) {
            matcheRating = playlist.rating === this.state.filterRating
            return matcheRating
          } else {
            matcheRating = playlist
          }
          return matcheRating
        }) : []
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1 >
              {this.state.user.name}'s playlist
            </h1>
            <DownloadPlaylist
              playlists={this.state.playlists}
            />
            <PlaylistCounter
              playlists={playlistsToRender}
            />
            <HoursCounter
              playlists={playlistsToRender}
            />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
              updateFilteredRating={this.updateFilteredRating}
              resetRateFiltering={this.resetRateFiltering}
              ratingFilterValue={this.state.filterRating}
            />
            <BrowserRouter>
              <div>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => <PlaylistsListing {...props} playlists={playlistsToRender} />}
                  />
                  <Route
                    exact
                    path="/:playlistId"
                    render={(props) => <PlaylistPage {...props} playlists={playlistsToRender} />}
                  // component={PlaylistPage}
                  />
                </Switch>
              </div>
            </BrowserRouter>
          </div> : <LoginPage />
        }
      </div>
    );
  }
}

export default App;
