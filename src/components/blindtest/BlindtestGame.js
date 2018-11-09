import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import className from 'classnames';

// my components
import Button from '../UI-components/Button';
import BlindtestSession from './BlindtestSession'
import PlaylistPicker from './PlaylistPicker'


// css
import '../../css/Blindtest.css';


const spotifyApi = new SpotifyWebApi();


class BlindtestGame extends Component {
    constructor() {
        super()
        this.state = {
            gameStarted: false,
            score: 0
        }
    }

    returnHome = () => {
        this.props.history.push(`/`)
    }

    startGame = () => {
        let gameStarted = !this.state.gameStarted
        if (this.state.playlistSelected) {
            const uri = {
                "context_uri": this.state.playlistSelected.uri,
            }
            spotifyApi.play(uri)
        }
        this.setState({ gameStarted })
    }

    endGame = () => {
        let gameStarted = this.state.gameStarted
        gameStarted = false
        this.setState({ gameStarted })
    }

    selectPlaylist = (playlist) => {
        this.setState({ playlistSelected: playlist })
    }

    updateScore = () => {
        let score = this.state.score
        score += 1
        if (this.state.gameStarted) {
            this.setState({
                score
            })
        }
        spotifyApi.skipToNext()
    }

    componentDidMount() {
        spotifyApi.setAccessToken(this.props.access_token)
    }

    render() {
        var blindestGameClass = className({
            selectPlaylist: true,
            hidden: this.state.gameStarted
        })
        return (
            <div>
                <div className="blindestGame">
                    <div className="close">
                        <Button content="retour à la maison" onClick={this.returnHome} />
                    </div>
                    <div className={blindestGameClass}>
                        <PlaylistPicker
                            selectPlaylist={this.selectPlaylist}
                            access_token={this.props.access_token}
                        />
                    </div>
                    {this.state.playlistSelected &&
                        <div className="game">
                            <p>Are you fucking ready ?</p>
                            <Button
                                content={this.state.gameStarted ? "stop this now" : "yes, go go go"}
                                onClick={this.state.gameStarted ? this.endGame : this.startGame} />
                        </div>
                    }
                </div>
                <div>
                    {this.state.gameStarted &&
                        <BlindtestSession
                            access_token={this.props.access_token}
                            updateScore={this.updateScore}
                            gameStarted={this.state.gameStarted}
                        />
                    }
                </div>
            </div>

        );
    }
}

export default BlindtestGame;