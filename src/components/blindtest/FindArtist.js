import React, { Component } from 'react';

import SpotifyWebApi from 'spotify-web-api-js';

// my components
import Countdown from './Countdown'
// import Button from './UI-components/Button';
import ArtistSelector from './ArtistSelector';

const spotifyApi = new SpotifyWebApi();



class FindArtist extends Component {
    constructor(props) {
        super(props);
        let timeToGuess = this.props.timeToGuess / 1000
        this.state = {
            currentSong: "",
            blindtestGuess: "",
            relatedArtists: [],
            answerIsCorrect: false,
            timeToGuess,
            toggleSong: true
        }
    }

    _isMounted = true

    // getCurrentPlayedSong = () => {
    //     if (this._isMounted) {
    //         spotifyApi.getMyCurrentPlaybackState()
    //             .then(response => {
    //                 this.setState({
    //                     currentSong: response.item.name,
    //                     currentArtist: {
    //                         name: response.item.artists[0].name,
    //                         id: response.item.artists[0].id
    //                     }
    //                 })
    //             })
    //     }
    // }

    // playBlindtest = (event) => {
    //     if (this._isMounted) {
    //         this.setState({ blindtestGuess: event.currentTarget.value })
    //         this.getCurrentPlayedSong()
    //     }
    // }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this._isMounted) {
            if (prevState.toggleSong !== this.state.toggleSong) {
                this.getCurrentPlayedSong()
            }

            // if (this.state.currentArtist && prevState.currentArtist !== this.state.currentArtist) {
            //     this.playBlindtest()
            // }

            if (this.state.blindtestGuess !== "" && this.state.currentSong.toLowerCase() === this.state.blindtestGuess.toLowerCase()) {
                if (this._isMounted) {
                    this.props.updateScore()
                    this.setState({ answerIsCorrect: true })
                    this.setState({ blindtestGuess: "" })
                }
            }

            if (prevProps.currentData !== this.props.currentData) {
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
                <ArtistSelector
                    relatedArtists={this.state.relatedArtists}
                    currentArtist={this.state.currentArtist}
                />
            </div>
        )
    }
}

export default FindArtist;