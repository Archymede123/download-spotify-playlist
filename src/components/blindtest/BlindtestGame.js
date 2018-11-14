import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import className from 'classnames';

// my components

import BlindtestSession from './BlindtestSession'
import PlaylistPicker from './PlaylistPicker'


// css
import '../../css/BlindtestSession.css';
import '../../css/BlindtestGame.css'


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

        this.props.history.push(`/`)
    }

    render() {
        var blindestGameClass = className({
            selectPlaylist: true,
            hidden: this.state.gameStarted
        })
        return (
            <div>
                <div className="playlistPicker">
                    <div className="header">
                        <div className="logo-container">
                            <img
                                src={require("../../images/logo64.png")}
                                alt="logo"
                                className='logo'
                            />
                        </div>
                        <div className="titles">
                            <h1 className='main-title'>Choisi une playlist</h1>
                            <h3 className='subtitle'>Cherche parmi les playlist spotify disponibles ou les tiennes</h3>
                        </div>
                        <div className="userinfos">
                            <div className="user-desc">
                                <p className="usertype">user</p>
                                <p className="username">{this.props.data.user[0]}</p>
                            </div>
                            <img className="user-pic" src={this.props.data.user[2]} alt="" />
                        </div>
                    </div>
                    <div className={blindestGameClass}>
                        <PlaylistPicker
                            selectPlaylist={this.selectPlaylist}
                            access_token={this.props.access_token}
                            data={this.props.data}
                        />
                    </div>
                    {this.state.playlistSelected &&
                        <div
                            className="game"
                            onClick={this.state.gameStarted ? this.endGame : this.startGame}
                        >
                            {this.state.gameStarted
                                ? <p className="game-cta">Arrêter la partie</p>
                                : <p className="game-cta">commencer le blindtest avec la playlist {this.state.playlistSelected.name}</p>
                            }
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