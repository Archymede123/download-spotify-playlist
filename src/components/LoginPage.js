import React, { Component } from 'react'
import queryString from 'query-string'

import Button from './UI-components/Button'
import BoxBorder from './UI-components/BoxBorder'
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

        const access_token = this.getHashParams();
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

        let parsed = queryString.parse(window.location.search)
        return parsed.access_token;
    }

    getUserInfo() {
        spotifyApi.getUserPlaylists()
            .then(response => {
                console.log(response)
            })
    }


    goToPlaylists = (event) => {
        event.preventDefault()
        window.location = window.location.href.includes('localhost')
            ? 'http://localhost:8888/login'
            : 'https://blindtest-spotify-backend.herokuapp.com/login'
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
        const buttonWidth = {
            width: '90%',
        }
        return (
            <BoxBorder className={'loginpage'}>
                <img
                    src={require("../images/logo.png")}
                    alt="logo"
                    className='logo'
                    sizes='' />
                <p className="baseline">Connecte toi à Spotify, tu verras ça va être super
                </p>
                <Button content="Se connecter" onClick={this.goToPlaylists} style={buttonWidth} />

            </BoxBorder>
        );
    }
}

export default LoginPage;