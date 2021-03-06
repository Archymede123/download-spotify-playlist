import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { Motion, spring } from 'react-motion'

// my components
import AristSelector from './ArtistSelector'
import SessionInformations from './SessionInformations'
import SessionAnswers from './SessionAnswers';


// js 
import { updateScore, getTotalScore } from '../../api/score'


//css
import '../../css/BlindtestSession.css'
import '../../css/SessionInformations.css'


const spotifyApi = new SpotifyWebApi();

class BlindtestSession extends Component {
    constructor(props) {
        super(props);
        let timeToGuess = 120
        this.state = {
            score: 0,
            songplayed: [],
            answers: [],
            blindtestLength: 10,
            sessionOn: false,
            timeToGuess,
            remainingTime: timeToGuess
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
                this.submitAnswer("")
            }
        }, 1000)
    }

    nextSongDelayed = () => {
        this.nextSongTimeout = setTimeout(() => {
            this.nextSong()
        }, 400000);
    }

    nextSong = () => {
        clearTimeout(this.nextSongTimeout)
        clearInterval(this.interval)
        this.updateResultList(this.state.currentData.song)
        this.setState({ remainingTime: this.state.timeToGuess })
        spotifyApi.skipToNext()
        this.timer()
    }


    updateResultList = (track) => {
        if (!this.state.songplayed.includes(track)) {
            let songplayed = [...this.state.songplayed, track]
            this.setState({ songplayed })
        }
    }

    restartGame = () => {
        this.props.history.push(`/`)
    }

    submitAnswer = (artistAnswered, imageUrl) => {
        clearInterval(this.interval)
        let timeSpent = this.state.timeToGuess - this.state.remainingTime
        let correct = this.state.currentData.artist.name === artistAnswered ? true : false
        let answers = [...this.state.answers, {
            answer: artistAnswered,
            artist: this.state.currentData.artist.name,
            song: this.state.currentData.song,
            imageUrl,
            correct,
            timeSpent
        }]
        this.setState({ answers }, () => this.updateScore())
        this.nextSongDelayed()
    }

    updateScore = () => {
        let answers = updateScore(this.state.answers, this.state.timeToGuess)
        let score = getTotalScore(answers)
        this.setState({ score, answers })
        this.updateResultList(this.state.currentData.song)
    }

    componentDidUpdate() {
        if (this.state.songplayed.length === this.state.blindtestLength & this.state.sessionOn) {
            clearInterval(this.interval)
            this.setState({ sessionOn: false })
        }
    }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
        this.timer()
        this.setState({ sessionOn: true })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        clearTimeout(this.nextSongTimeout)
    }

    render() {
        return (
            <div className="blindtest-session">
                <div
                    className='return-home'
                    onClick={this.restartGame}
                >
                </div>
                {this.state.answers.length > 0 &&
                    <Motion
                        defaultStyle={{ x: -800 }}
                        style={{ x: spring(0) }}
                    >
                        {(style) => (
                            <SessionAnswers
                                history={this.props.history}
                                score={this.state.score}
                                answers={this.state.answers}
                                style={{ transform: `translateX(${style.x}px)` }}
                                sessionOn={this.state.sessionOn}
                                restartGame={this.restartGame}
                            />
                        )}
                    </Motion>
                }
                {this.state.sessionOn && this.state.currentData &&
                    <div className={this.state.answers.length > 0 ? "current-session canGrow" : "current-session"}>

                        <SessionInformations
                            score={this.state.score}
                            remainingTime={this.state.remainingTime}
                            sessionOn={this.state.sessionOn}
                        />


                        <div className='current-blindest'>
                            <Motion
                                defaultStyle={{ x: -800, opacity: 0 }}
                                style={{ x: spring(0), opacity: spring(1) }}
                            >
                                {(style) => (
                                    <AristSelector
                                        style={{ transform: `translateX(${style.x}px)`, opacity: style.opacity }}
                                        currentData={this.state.currentData}
                                        submitAnswer={this.submitAnswer}
                                        nextSong={this.nextSong}
                                        answers={this.state.answers}
                                        sessionOn={this.state.sessionOn}
                                    />
                                )}

                            </Motion>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default BlindtestSession;