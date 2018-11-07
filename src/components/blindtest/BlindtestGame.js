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
            timeToGuess: 10,
            score: 0
        }
    }

    startGame = () => {
        let gameStarted = !this.state.gameStarted
        this.setState({ gameStarted })
    }

    updateScore = () => {
        let score = this.state.score
        let timeToGuess = this.state.timeToGuess
        score += 1
        if (this.state.gameStarted) {
            this.setState({
                score,
                timeToGuess,
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