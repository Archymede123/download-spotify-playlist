import React, { Component } from 'react';
//css import
import '../css/App.css';
// js 
import { fetchPlaylistInfos, fetchPlaylistData } from '../api/fetchData'

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            playlists: {},
        }
    }

    _isMounted = true;

    goToPlaylists = (event) => {
        event.preventDefault()
        window.location = 'http://localhost:8888/login'
    }

    componentDidMount() {
        let accessToken = new URLSearchParams(window.location.search).get('access_token');
        if (!accessToken) return;

        if (this._isMounted) {
            fetchPlaylistInfos(accessToken).then(data => {
                this.setState({
                    user: [data.display_name, data.followers.total, data.images[0].url]
                })
            })

            fetchPlaylistData(accessToken).then(playlists => {
                this.setState({
                    playlists: playlists.map((item, index) => {
                        return {
                            name: item.name,
                            songs: item.trackDatas,
                            imageUrl: item.images[0].url,
                            rating: 0,
                            index: index
                        }
                    }
                    )
                })
            })
        }
    }

    componentDidUpdate() {
        let statePlaylist = this.state.playlists
        if (Object.keys(statePlaylist).length !== 0) {
            this.props.loadSpotifyData(this.state)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <div>
                <p style={{ margin: 0 }}>You currently have no playlist loaded. Click the button
                    below to login to your spotify account
                </p>
                <button onClick={this.goToPlaylists}
                    style={{ 'fontSize': '16px', 'padding': '16px 32px', 'backgroundColor': '#1CD156', 'marginTop': '64px' }}>Sign In with Spotify</button>
            </div>

        );
    }
}

export default LoginPage;