import React, { Component } from 'react';
import DownloadPlaylist from './DownloadPlaylist';
import Playlist from './Playlist';
import HoursCounter from './HoursCounter.js';
import Filter from './Filter';
import PlaylistCounter from './PlaylistCounter';
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
    // this.addTag = this.addTag.bind(this)

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

    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: {
            name: data.display_name
          }
        })
      })

    fetch(`https://api.spotify.com/v1/me/playlists?limit=49`, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = [];
          [0, 1, 2].forEach(page => {
            let responsePromiseDetails = fetch(`${playlist.tracks.href}?offset=${page}00`, {
              headers: { 'Authorization': 'Bearer ' + accessToken }
            }).then(response => response.json())
            responsePromise.push(responsePromiseDetails)
          })
          let trackDataPromise = Promise.all(responsePromise)
          return trackDataPromise
        })
        let allTracksDataPromises =
          Promise.all(trackDataPromises)
        let playlistsPromise = allTracksDataPromises.then(trackDatasArrays => {
          trackDatasArrays.map((trackDatas, index) => {
            let trackDatasPushed = [];
            trackDatas.map(track => {
              return trackDatasPushed.push(track.items)
            })
            let flatten = array => Array.isArray(array)
              ? [].concat(...array.map(flatten))
              : array
            let trackDatasFlatten = flatten(trackDatasPushed)
            let playlistTrackData = []
            trackDatasFlatten.forEach((trackData, i) => {
              let playlistSong = {
                name: trackData.track.name,
                duration: trackData.track.duration_ms / 1000
              }
              playlistTrackData.push(playlistSong)
            })
            return playlists[index].trackDatas = playlistTrackData
          })
          return playlists
        })
        return playlistsPromise
      })
      .then(playlists => {
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
          // let matcheRating = playlist.rating === this.state.filterRating
          // return matcheRating
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
            <DownloadPlaylist playlists={this.state.playlists} />
            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
              updateFilteredRating={this.updateFilteredRating}
              resetRateFiltering={this.resetRateFiltering}
              ratingFilterValue={this.state.filterRating}
            />

            <div className="playlistGrid">
              {playlistsToRender.map((playlist, key) =>
                <Playlist
                  playlist={playlist}
                  addTag={this.addTag}
                  key={key}
                  index={key}
                  addPlaylistRating={this.addPlaylistRating}
                />
              )}
            </div>


          </div> : <button onClick={() => window.location = 'http://localhost:8888/login'}
            style={{ 'fontSize': '16px', 'padding': '16px 32px', 'backgroundColor': '#1CD156', 'marginTop': '64px' }}>Sign In with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
