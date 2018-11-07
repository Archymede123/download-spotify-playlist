import React, { Component } from 'react';
// import Button from './UI-components/Button';
import SpotifyWebApi from 'spotify-web-api-js';
import Countdown from './Countdown'

const spotifyApi = new SpotifyWebApi();



class Blindtest extends Component {
    constructor(props) {
        super(props);
        let gameStarted = this.props.gameStarted
        this.state = {
            currentSong: "",
            blindtestGuess: "",
            answerIsCorrect: false,
            gameStarted,
            timeToGuess: 500
        }
    }

    _isMounted = true

    playBlindtest = (event) => {
        if (this._isMounted) {
            this.setState({ blindtestGuess: event.currentTarget.value })
            spotifyApi.getMyCurrentPlaybackState()
                .then(response => {
                    this.setState({ currentSong: response.item.name })
                })
        }
    }

    stopCountdown = () => {
        this.setState({ gameStarted: false })
    }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
        this.setState({ gameStarted: false })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gameStarted !== this.props.gameStarted) {
            let gameStarted = !this.state.gameStarted
            this.setState({ gameStarted })
        }

        if (this.state.blindtestGuess !== "" && this.state.currentSong.toLowerCase() === this.state.blindtestGuess.toLowerCase()) {
            if (this._isMounted) {
                this.props.updateScore()
                this.setState({ blindtestGuess: "" })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false
        this.setState({ gameStarted: false })
    }

    render() {
        return (
            <div>
                <p>Try to guess the song now playing</p>
                <Countdown stopCountdown={this.stopCountdown} />
                <input className="answer-input" type="text" onChange=
                    {this.playBlindtest} value={this.state.blindtestGuess} />
            </div>
        )
    }
}

export default Blindtest;