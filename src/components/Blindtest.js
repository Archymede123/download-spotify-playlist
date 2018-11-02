import React, { Component } from 'react';
// import Button from './UI-components/Button';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();



class Blindtest extends Component {
    constructor() {
        super();
        this.state = {
            currentSong: "",
            blindtestGuess: ""
        }
    }

    playBlindtest = (event) => {
        this.setState({ blindtestGuess: event.currentTarget.value })
        spotifyApi.getMyCurrentPlaybackState()
            .then(response => {
                console.log(response)
                this.setState({ currentSong: response.item.name })
            })

    }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
    }
    // start game - 10 songs are playing
    // play a song for 30 seconds
    // if answer is correct, count 1 and play next song after 5 seconds


    render() {
        let answerIsCorrect = this.state.currentSong.toLowerCase() === this.state.blindtestGuess.toLowerCase()
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