import React, { Component } from 'react';
import Button from '../UI-components/Button';
import Blindtest from './Blindtest'
// import SpotifyWebApi from 'spotify-web-api-js';

import '../../css/Blindtest.css';

// const spotifyApi = new SpotifyWebApi();



class BlindtestGame extends Component {
    constructor() {
        super()
        this.state = {
            gameStarted: false,
            timeToGuess: 5,
            score: 0
        }
    }

    startGame = () => {
        this.setState({ gameStarted: true })
        this.startCounter()
    }

    startCounter = () => {
        let timeToGuess = this.state.timeToGuess
        let interval = setInterval(() => {
            timeToGuess -= 1
            this.setState({ timeToGuess })
            if (timeToGuess < 0) {
                clearInterval(interval)
                this.setState({
                    gameStarted: false,
                    timeToGuess: 5
                })
            }
        }, 1000)
    }

    updateScore = () => {
        let score = this.state.score
        score += 1
        if (this.state.gameStarted) {
            this.setState({
                score: score,
                timeToGuess: 5,
                gameStarted: false
            })
        }
    }

    render() {
        return (
            <div className="blindestGame">
                <div className="close">
                    <Button content="close" onClick={this.props.closeGame} />
                </div>
                <div className="informations">
                    <p>You currently have {this.state.score} points</p>
                    <p>Previously played songs</p>
                </div>
                <div className="game">
                    <p>Are you fucking ready ?</p>
                    <Button content="yes, go go go" onClick={this.startGame} />
                    <div>
                        <p>You have {this.state.timeToGuess} seconds to guess the song</p>
                        <Blindtest
                            access_token={this.props.access_token}
                            updateScore={this.updateScore}
                            gameStarted={this.state.gameStarted}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default BlindtestGame;