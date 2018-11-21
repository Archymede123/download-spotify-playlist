import React, { Component } from 'react';
// import Button from './UI-components/Button';
import SpotifyWebApi from 'spotify-web-api-js';
import Countdown from './Countdown'

const spotifyApi = new SpotifyWebApi();



class Blindtest extends Component {
    constructor(props) {
        super(props);
        let timeToGuess = this.props.timeToGuess / 1000
        this.state = {
            currentSong: "",
            blindtestGuess: "",
            answerIsCorrect: false,
            timeToGuess,
            toggleSong: true
        }
    }

    _isMounted = true

    getCurrentPlayedSong = () => {
        if (this._isMounted) {
            spotifyApi.getMyCurrentPlaybackState()
                .then(response => {
                    console.log(response)
                    this.setState({
                        currentSong: response.item.name,
                        // currentArtist: response.item.
                    })
                })
        }
    }

    playBlindtest = (event) => {
        if (this._isMounted) {
            this.setState({ blindtestGuess: event.currentTarget.value })
            this.getCurrentPlayedSong()
        }
    }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
        this.getCurrentPlayedSong()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this._isMounted) {
            if (this.state.blindtestGuess !== "" && this.state.currentSong.toLowerCase() === this.state.blindtestGuess.toLowerCase()) {
                if (this._isMounted) {
                    this.props.updateScore()
                    this.setState({ answerIsCorrect: true })
                    this.setState({ blindtestGuess: "" })
                }
            }

            if (prevProps.currentSong !== this.props.currentSong) {
                this.setState({
                    toggleSong: !this.state.toggleSong,
                    answerIsCorrect: false
                })
            }
        }

    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <div>
                <p>Try to guess the song now playing</p>
                <Countdown
                    timeToGuess={this.state.timeToGuess}
                    key={this.state.toggleSong}
                    answerIsCorrect={this.state.answerIsCorrect}
                />
                <input
                    className="answer-input"
                    type="text"
                    onChange={this.playBlindtest}
                    value={this.state.blindtestGuess}
                    disabled={this.state.answerIsCorrect ? "disabled" : ""}
                />
            </div>
        )
    }
}

export default Blindtest;