import React, { Component } from 'react';
// import Button from './UI-components/Button';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();



class Blindtest extends Component {
    constructor(props) {
        super(props);
        let gameStarted = this.props.gameStarted
        this.state = {
            currentSong: "",
            blindtestGuess: "",
            answerIsCorrect: false,
            gameStarted: gameStarted
        }
    }

    _isMounted = true

    playBlindtest = (event) => {
        this.setState({ blindtestGuess: event.currentTarget.value })
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => {
                this.setState({ currentSong: response.item.name })
            })
    }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
    }

    componentDidUpdate() {
        if (this.state.blindtestGuess !== "" && this.state.currentSong.toLowerCase() === this.state.blindtestGuess.toLowerCase()) {
            if (this._isMounted) {
                this.props.updateScore()
                this.setState({ blindtestGuess: "" })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        let answerIsCorrect = this.state.answerIsCorrect
        return (
            <div className="blindest">
                <p>Try to guess the song now playing</p>
                <input className="answer-input" type="text" onChange=
                    {this.playBlindtest} />
                {this.state.blindtestGuess !== "" ?
                    (answerIsCorrect
                        ? <p>you're good</p>
                        : <p>keep going</p>
                    )
                    : null
                }
            </div>
        );
    }
}

export default Blindtest;