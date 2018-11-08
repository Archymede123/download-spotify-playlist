import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// my components
import Blindtest from './Blindtest'

const spotifyApi = new SpotifyWebApi();

class BlindtestSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            songplayed: [],
            blindtestLength: 10,
            sessionEnded: false,
            timeToGuess: 30000,
            currentSong: ""
        }
    }

    manageMusic = () => {
        this.interval = setInterval(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then(response => {
                    let currentSong = response.item.name
                    this.setState({ currentSong })
                    this.updateResultList(currentSong)
                })
            this.toggleSong()
            spotifyApi.skipToNext()
        }, this.state.timeToGuess)
    }

    updateResultList = (track) => {
        if (!this.state.songplayed.includes(track)) {
            let songplayed = [...this.state.songplayed, track]
            this.setState({ songplayed })
        }
    }

    updateScore = () => {
        let score = this.state.score
        score += 1
        this.setState({ score })
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => this.updateResultList(response.item.name))
    }

    toggleSong = () => {
        let switchedSong = !this.state.switchedSong
        this.setState({ switchedSong })
    }

    componentDidUpdate() {
        if (this.state.songplayed.length === this.state.blindtestLength & !this.state.sessionEnded) {
            clearInterval(this.interval)
            this.setState({ sessionEnded: true })
        }
    }

    componentDidMount() {
        this.manageMusic()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className="blindtest-session">

                <div className="informations">
                    <p>Welcome to the blindtest </p>
                    <p>You currently have {this.state.score} points</p>
                    <p>Previously played songs: </p>
                    <ul>
                        {this.state.songplayed.map((song, key) =>
                            <li key={key}>{song}</li>
                        )}
                    </ul>
                </div>
                {!this.state.sessionEnded &&
                    <Blindtest
                        timeToGuess={this.state.timeToGuess}
                        access_token={this.props.access_token}
                        updateScore={this.updateScore}
                        toggleSong={this.state.toggleSong}
                        currentSong={this.state.currentSong}
                    />
                }
            </div>

        );
    }
}

export default BlindtestSession;