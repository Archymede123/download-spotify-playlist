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
        // this.startCounter()
    }

    // startCounter = () => {
    //     let interval = setInterval(() => {
    //         let timeToGuess = this.state.timeToGuess
    //         timeToGuess -= 1
    //         this.setState({ timeToGuess })
    //     }, 1000)
    //     console.log(interval)
    //     return interval
    // }

    // stopCounter = (interval) => {
    //     clearInterval(interval)
    //     this.setState({
    //         gameStarted: false,
    //         timeToGuess: 10
    //     })
    // }



    // startCounter = () => {
    //     let timeToGuess = this.state.timeToGuess
    //     if (this.state.gameStarted) {
    //         let interval = setInterval(() => {
    //             timeToGuess -= 1
    //             this.setState({ timeToGuess })
    //             if (timeToGuess < 1) {
    //                 clearInterval(interval)
    //                 this.setState({
    //                     gameStarted: false,
    //                     timeToGuess: 10
    //                 })
    //             }
    //         }, 1000)
    //         console.log(interval)
    //     }

    // }

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

    componentDidUpdate(prevStates) {
        // prevStates.gameStarted === this.state.gameStarted && this.startCounter()
        // this.state.timeToGuess === 0 && this.setState({ gameStarted: false })
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
                        {/* {this.state.gameStarted &&
                            <p>You have {this.state.timeToGuess} seconds to guess the song</p>
                        } */}
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