import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import className from 'classnames';
import Button from './UI-components/Button';
import Blindtest from './Blindtest'

// css
import '../css/PlaylistPage.css';

const spotifyApi = new SpotifyWebApi();



class PlaylistPage extends Component {
    constructor() {
        super();
        this.state = {
            playlist: {},
            blindtestPlaying: false
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

    startBlindtest = () => {
        this.setState({ blindtestPlaying: true })
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
        var blindTestClass = className({
            blindtest: true,
            playing: this.state.blindtestPlaying,
            hidden: !this.state.blindtestPlaying
        })
        return (
            <div className="playlistPage">
                <Button content="Back to playlist list" onClick={this.handleBackButton} />
                <div>
                    <p>{playlist.name}</p>
                    <Button content="Play" onClick={this.triggerPlaylist} />
                </div>
                <Button content="start blindtest" onClick={this.startBlindtest} />
                <div className={blindTestClass}>

                </div>
                <Blindtest access_token={this.props.access_token} />
                {playlist.songs ?
                    <ul className="song-list"> {playlist.songs.map((song, key) =>
                        <li key={key}>{song.name}</li>
                    )} </ul>
                    : null
                }
            </div>


        );
    }
}

export default PlaylistPage;