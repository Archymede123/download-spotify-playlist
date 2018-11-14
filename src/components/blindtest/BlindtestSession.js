import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// my components

// import FindArtist from './FindArtist'
import AristSelector from './ArtistSelector';

const spotifyApi = new SpotifyWebApi();

class BlindtestSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            songplayed: [],
            blindtestLength: 9,
            sessionOn: false,
            timeToGuess: 120000,
        }
    }

    getCurrentPlayedSong = () => {
        setTimeout(() => {
            spotifyApi.getMyCurrentPlaybackState()
                .then(response => {
                    let currentData = {
                        song: response.item.name,
                        artist: {
                            name: response.item.artists[0].name,
                            id: response.item.artists[0].id
                        }
                    }
                    this.setState({ currentData })
                })
        }, 300);

    }

    manageMusic = () => {
        this.interval = setInterval(() => {
            this.getCurrentPlayedSong()
            this.updateResultList(this.state.currentData.song)
            // this.toggleSong()
            spotifyApi.skipToNext()
        }, this.state.timeToGuess)
    }

    updateResultList = (track) => {
        if (!this.state.songplayed.includes(track)) {
            let songplayed = [...this.state.songplayed, track]
            this.setState({ songplayed })
        }
    }

    submitAnswer = (artist) => {
        this.state.currentData.artist.name === artist && this.updateScore()
    }

    updateScore = () => {
        let score = this.state.score
        score += 1
        this.setState({ score })
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => this.updateResultList(response.item.name))
    }

    componentDidUpdate() {
        if (this.state.songplayed.length === this.state.blindtestLength & this.state.sessionOn) {
            clearInterval(this.interval)
            this.setState({ sessionOn: false })
        }
    }

    componentDidMount() {
        this.getCurrentPlayedSong()
        this.manageMusic()
        this.setState({ sessionOn: true })
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
                {this.state.sessionOn && this.state.currentData &&
                    <AristSelector
                        currentData={this.state.currentData}
                        submitAnswer={this.submitAnswer}
                    />
                    // <FindArtist
                    //     timeToGuess={this.state.timeToGuess}
                    //     access_token={this.props.access_token}
                    //     updateScore={this.updateScore}
                    //     // toggleSong={this.state.toggleSong}
                    //     currentData={this.state.currentData}
                    // />
                }
            </div>

        );
    }
}

export default BlindtestSession;