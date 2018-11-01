import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Button from './UI-components/Button';

// css
import '../css/PlaylistPage.css';

const spotifyApi = new SpotifyWebApi();



class PlaylistPage extends Component {
    constructor() {
        super();
        this.state = {
            playlist: {}
        }
    }

    handleBackButton = () => {
        this.props.history.push(`/`)
    }

    triggerPlaylist = () => {

        const uri = {
            "context_uri": this.state.playlist.uri,
        }
        spotifyApi.play(uri)
    }

    componentDidMount() {
        let playlistIndex = this.props.match.params.playlistId.match(/\d/)
        let playlist = this.props.playlists.find(playlist =>
            playlist.index.toString() === playlistIndex[0]
        )
        this.setState({ playlist })
        spotifyApi.setAccessToken(this.props.access_token)
    }

    render() {
        let playlist = this.state.playlist
        return (
            <div>
                <Button content="Back to playlist list" onClick={this.handleBackButton} />
                <div>
                    <p>{playlist.name}</p>
                    <Button content="Play" onClick={this.triggerPlaylist} />
                </div>
                {playlist.songs ?
                    <div className="song-list"> {playlist.songs.map((song, key) =>
                        <ul>
                            <li key={key}>{song.name}</li>
                        </ul>
                    )} </div>
                    : null
                }
            </div>


        );
    }
}

export default PlaylistPage;