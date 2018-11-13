import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';


// my components 
// import PlaylistCard from '../PlaylistCard';
import PlaylistPickerCards from './PlaylistPickerCards'

// content
import spotifyPlaylists from './SpotifyPlaylists'

const spotifyApi = new SpotifyWebApi();

class PlaylistPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyPlaylists,
            playlistsToRender: [],
            genres: []
        }
    }

    selectPlaylist = (selectedPlaylist) => {
        this.setState({ selectedPlaylist })
        this.props.selectPlaylist(selectedPlaylist)
    }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
        spotifyPlaylists.map(playlist => {
            let id = playlist.uri.match(/[^:]*$/)
            return spotifyApi.getPlaylist(id)
                .then(playlistResponse => {
                    let tracks = playlistResponse.tracks.items.map(track => {
                        let artistId = track.track.artists[0].uri
                        let trackData = {
                            name: track.track.name,
                            uri: track.track.uri,
                            artistUri: artistId
                        }
                        return trackData
                    })
                    let playlist = {
                        imageUrl: playlistResponse.images[0].url,
                        name: playlistResponse.name,
                        songs: tracks,
                        uri: playlistResponse.uri
                    }
                    let playlistsToRender = [...this.state.playlistsToRender, playlist]
                    this.setState({ playlistsToRender })
                })
        })
    }

    render() {
        return (
            <div className="playlist-picker">
                <p className='playlist-owner'>Spotify playlists</p>
                <div className="playlistGrid">
                    {this.state.playlistsToRender.map((playlist, key) =>
                        <PlaylistPickerCards
                            playlist={playlist}
                            key={key}
                            index={key}
                            history={this.props.history}
                            selectPlaylist={this.selectPlaylist}
                            selectedPlaylist={this.state.selectedPlaylist}
                            access_token={this.props.access_token}
                        />
                    )}
                </div>
                <p className='playlist-owner'>Your playlists</p>
                <div className="playlistGrid">
                    {this.props.data.playlists.map((playlist, key) =>
                        <PlaylistPickerCards
                            playlist={playlist}
                            key={key}
                            index={key}
                            history={this.props.history}
                            selectPlaylist={this.selectPlaylist}
                            selectedPlaylist={this.state.selectedPlaylist}
                            access_token={this.props.access_token}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default PlaylistPicker;