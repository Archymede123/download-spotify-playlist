import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import className from 'classnames';

// my components

import BlindtestSession from './BlindtestSession'
import PlaylistPicker from './PlaylistPicker'
import Header from './Header'



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
                .catch(() => {
                    localStorage.clear()
                    this.props.history.push(`/`)
                    this.setState({ user: false })
                })
        }
        this.props.history.push(`/blindtest`)
        this.setState({ gameStarted })
    }

    endGame = () => {
        let gameStarted = this.state.gameStarted
        gameStarted = false
        this.setState({ gameStarted })
    }

    unlog = () => {
        this.setState({ user: false })
    }

    selectPlaylist = (playlist) => {
        this.setState({ playlistSelected: playlist })
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
                <div>
                    <div className="playlistPicker">
                        <Header user={this.props.data.user} />
                        <div className={blindestGameClass}>
                            <PlaylistPicker
                                selectPlaylist={this.selectPlaylist}
                                access_token={this.props.access_token}
                                data={this.props.data}
                                history={this.props.history}
                                unlog={this.unlog}
                            />
                        </div>
                        {this.state.playlistSelected &&
                            <div
                                className="game"
                                onClick={this.state.gameStarted ? this.endGame : this.startGame}
                            >
                                {this.state.gameStarted
                                    ? <p className="game-cta">Arrêter la partie en cours</p>
                                    : <p className="game-cta">commencer le blindtest avec la playlist {this.state.playlistSelected.name}</p>
                                }
                            </div>
                        }
                    </div>
                    <div>
                        {this.state.gameStarted &&
                            <BlindtestSession
                                access_token={this.props.access_token}
                                gameStarted={this.state.gameStarted}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BlindtestGame;