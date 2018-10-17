import React, { Component } from 'react';
import './App.css';
import { CSVLink } from 'react-csv';
// import querystring from 'query-string';



let defaultTextColor = "red";
let defaultStyle = {
  color: defaultTextColor
}

// let fakeServerData = {
//   user: {
//     name: "Patrick",
//     playlists: [
//       {
//         name: 'my fav',
//         songs: [
//           { name: 'get up stand up', duration: 1345 },
//           { name: 'jammin', duration: 1564 },
//           { name: 'marcher dans le sable', duration: 392 }
//         ]
//       }
//     ]
//   }
// }

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2 style={defaultStyle}>
          {this.props.playlists.length} playlists
          </h2>
      </div >
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0)
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2 style={defaultStyle}>
          {Math.round(totalDuration / 60)} Hours
        </h2>
      </div >
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img src="" alt="" />
        <input type="text" onKeyUp=
          {e => this.props.onTextChange(e.target.value)} />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{ ...defaultStyle, width: '25%', display: 'inline-block' }}>
        <img src={playlist.imageUrl} alt="" style={{ width: '160px' }} />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.slice(0, 3).map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>

    );
  }
}

class DownloadPlaylist extends Component {
  render() {
    let playlists = this.props.playlists
    // let songs = playlistsSongs[0].songs

    if (this.props.playlists) {
      let playlistsToDownload = []
      playlists.forEach(playlist => {
        let playlistToDownload = []
        playlistToDownload.push(playlist.name)
        playlist.songs.forEach(song => {
          playlistToDownload.push(song.name)
        })
        playlistsToDownload.push(playlistToDownload)
      })
      console.log(playlistsToDownload)
      return (
        < CSVLink data={playlistsToDownload}
          filename={"my-file.csv"}
          target="_blank" >
          Download playlists as CSV
        </CSVLink >
      )
    }
    return (null)
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
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
          // let responsePromise = fetch(`${playlist.tracks.href}?offset=100`, {
          //   headers: { 'Authorization': 'Bearer ' + accessToken }
          // })
          let responsePromise = [];
          // function fetchData(page) {
          //   let responsePromiseDetails = fetch(`${playlist.tracks.href}?offset=${page}00`, {
          //     headers: { 'Authorization': 'Bearer ' + accessToken }
          //   }).then(response => response.json())
          //   responsePromise.push(responsePromiseDetails)
          // }
          // for (let i = 1; i < 6; i++) {
          //   setTimeout(fetchData(i), 50000)
          // }

          // function fetchData(page) {
          //   console.log(`hello ${page}`)
          // }
          // for (let i = 1; i < 6; i++) {
          //   setTimeout(fetchData(i), i * 1000)
          // }

          let i = 1;                     //  set your counter to 1

          function myLoop() {           //  create a loop function
            setTimeout(function () {    //  call a 3s setTimeout when the loop is called
              let responsePromiseDetails = fetch(`${playlist.tracks.href}?offset=${i}00`, {
                headers: { 'Authorization': 'Bearer ' + accessToken }
              }).then(response => response.json())
              responsePromise.push(responsePromiseDetails);
              i++;                     //  increment the counter
              if (i < 5) {            //  if the counter < 10, call the loop function
                myLoop();             //  ..  again which will trigger another 
              }                        //  ..  setTimeout()
            }, 6000)
          }

          myLoop();



          // for (let i = 1; i < 10; i++) {
          //   setTimeout(function timer() {
          //     alert("hello world");
          //   }, i * 3000);
          // }

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
        console.log(playlists)
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              songs: item.trackDatas,
              imageUrl: item.images[0].url
            }
          }
          )
        })
      })
  }

  render() {
    console.log(this.state.playlists)
    let playlistsToRender =
      this.state.user &&
        this.state.playlists
        ? this.state.playlists.filter(playlist => {
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
          let matchesSong = playlist.songs.find(song =>
            song.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
          return matchesPlaylist || matchesSong
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
            <Filter onTextChange={text => this.setState({ filterString: text })} />
            {playlistsToRender.map(playlist =>
              <Playlist playlist={playlist} />
            )}

          </div> : <button onClick={() => window.location = 'http://localhost:8888/login'}
            style={{ 'fontSize': '16px', 'padding': '16px 32px', 'backgroundColor': '#1CD156', 'marginTop': '64px' }}>Sign In with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
