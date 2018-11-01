import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();



class PlaylistPage extends Component {
    constructor() {
        super();
        const access_token = this.props.access_token
        if (access_token) {
            spotifyApi.setAccessToken(access_token)
        }
        this.state = {
            nowPlaying: { name: 'Unknown yet', albumArt: '' }
        }
    }

    getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => {
                console.log(response)
            })
    }

    // componentDidMount() {
    //     let playlistIndex = this.props.match.params.playlistId.match(/\d/)
    //     console.log(playlistIndex[0])
    //     let playlist = this.props.playlists.find(playlist => playlist.index === playlistIndex[0])
    // }

    render() {
        let playlistIndex = this.props.match.params.playlistId.match(/\d/)
        let playlist = this.props.playlists.find(playlist =>
            playlist.index.toString() === playlistIndex[0]
        )

        return (
            <div>
                <p>{playlist.name}</p>
            </div>

        );
    }
}

export default PlaylistPage;