import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

// my components
import AristSelector from './ArtistSelector'
import SessionInformations from './SessionInformations'

//css
import '../../css/BlindtestSession.css'
import '../../css/SessionInformations.css'

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
            remainingTime: 5
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


    timer = () => {
        this.getCurrentPlayedSong()
        this.interval = setInterval(() => {
            let remainingTime = this.state.remainingTime
            remainingTime -= 1
            this.setState({ remainingTime })
            if (remainingTime < 1) {
                clearInterval(this.interval)
                this.nextSong()
                this.updateResultList(this.state.currentData.song)
            }
        }, 1000)
    }

    nextSong = () => {
        this.setState({ remainingTime: 5 })
        this.timer()
        spotifyApi.skipToNext()
    }

    // manageMusic = () => {
    //     this.interval = setInterval(() => {
    //         this.getCurrentPlayedSong()
    //         this.updateResultList(this.state.currentData.song)
    //         spotifyApi.skipToNext()
    //     }, this.state.timeToGuess)
    // }

    updateResultList = (track) => {
        if (!this.state.songplayed.includes(track)) {
            let songplayed = [...this.state.songplayed, track]
            this.setState({ songplayed })
        }
    }

    submitAnswer = (artist) => {
        clearInterval(this.interval)
        this.state.currentData.artist.name === artist && this.updateScore()
        this.nextSong()
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
        // this.getCurrentPlayedSong()
        this.timer()
        // this.manageMusic()
        this.setState({ sessionOn: true })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className="blindtest-session">
                <ul className="played-song">
                    {this.state.songplayed.map((song, key) =>
                        <li key={key}>{song}</li>
                    )}
                </ul>
                <div className="current-session">
                    <SessionInformations
                        score={this.state.score}
                        remainingTime={this.state.remainingTime}
                    />
                    {this.state.sessionOn && this.state.currentData &&
                        <AristSelector
                            currentData={this.state.currentData}
                            submitAnswer={this.submitAnswer}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default BlindtestSession;