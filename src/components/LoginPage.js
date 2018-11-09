import React, { Component } from 'react'
import Button from './UI-components/Button'
import SpotifyWebApi from 'spotify-web-api-js'

//css 
import '../css/App.css'
import '../css/login.css'
//js 
import { fetchPlaylistInfos, fetchPlaylistData } from '../api/fetchData'

const spotifyApi = new SpotifyWebApi();

class LoginPage extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const access_token = params.access_token;
        if (access_token) {
            spotifyApi.setAccessToken(access_token)
        }
        this.state = {
            user: {},
            playlists: {},
            access_token: access_token,
            loggedIn: access_token ? true : false,
        }
    }

    _isMounted = true;

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getUserInfo() {
        spotifyApi.getUserPlaylists()
            .then(response => {
                console.log(response)
            })
    }


    goToPlaylists = (event) => {
        event.preventDefault()
        window.location = 'http://localhost:8888/login'
    }

    componentDidMount() {
        let accessToken = this.state.access_token
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
                            index: index,
                            uri: item.uri
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
            <div className="loginpage">
                <img src={require("../images/logo.png")} alt="logo" className='logo' />
                <p className="baseline">Connectez vous avec Spotify pour trouver des nouvelles playlists et jouer au blindtest
                </p>
                <Button content="Se connecter avec Spotify" onClick={this.goToPlaylists} />
            </div>

        );
    }
}

export default LoginPage;