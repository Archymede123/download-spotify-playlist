import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// content
import spotifyPlaylists from './SpotifyPlaylists'

const spotifyApi = new SpotifyWebApi();

class PlaylistPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyPlaylists
        }
    }

    handleChange = (event) => {
        let selectedOption = event.target
        let name = selectedOption.options[selectedOption.selectedIndex].getAttribute('name')
        let uri = selectedOption.value
        let id = uri.match(/[^:]*$/)
        let playlist = {
            name,
            uri,
            id
        }
        this.setState({ playlist })
        this.props.selectPlaylist(playlist)
        this.fetchPlaylist(playlist.id)
    }

    fetchPlaylist = (playlistId) => {
        spotifyApi.getPlaylist(playlistId).then(response => {
            let playlistLength = response.tracks.items.length
            this.setState({ playlistLength })
        })
    }


    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
    }

    render() {
        return (
            <div>
                <p>Select a playlist from the list</p>
                <select name="playlistList" id="playlistList" onChange={this.handleChange}>
                    <option value="placeholder"> -- select an option -- </option>
                    {this.state.spotifyPlaylists.map((playlist, key) =>
                        <option key={key} name={playlist.name} value={playlist.uri}>{playlist.name}</option>
                    )}
                </select>
                {this.state.playlistLength &&
                    <p>There are {this.state.playlistLength} tracks in this playlist</p>
                }
            </div>
        );
    }
}

export default PlaylistPicker;