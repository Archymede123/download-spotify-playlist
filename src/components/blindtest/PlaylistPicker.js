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
            playlistsToRender: []
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
                .then(response => {
                    let tracks = response.tracks.items.map(track => {
                        let trackData = { name: track.track.name }
                        return trackData
                    })

                    let playlist = {
                        imageUrl: response.images[0].url,
                        name: response.name,
                        songs: tracks,
                        uri: response.uri
                    }
                    let playlistsToRender = [...this.state.playlistsToRender, playlist]
                    this.setState({ playlistsToRender })
                })
        })
    }

    render() {
        return (
            <div className="playlist-picker">
                <p>Choisi une super playlist, bouge ton cul trou de balle</p>
                <div className="playlistGrid">
                    {this.state.playlistsToRender.map((playlist, key) =>
                        <PlaylistPickerCards
                            playlist={playlist}
                            key={key}
                            index={key}
                            history={this.props.history}
                            selectPlaylist={this.selectPlaylist}
                            selectedPlaylist={this.state.selectedPlaylist}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default PlaylistPicker;