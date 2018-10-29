import React, { Component } from 'react';
import '../css/App.css';
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

class LoginPage extends Component {

    handleClick(rating) {
        this.props.updateFilteredRating(rating)
    }

    goToPlaylists = (event) => {
        event.preventDefault()
        window.location = 'http://localhost:8888/login'
    }

    render() {
        return (
            <div className="App">
                <button onClick={this.goToPlaylists}> Sign In with Spotify</button>
                <button onClick={this.goToPlaylists}
                    style={{ 'fontSize': '16px', 'padding': '16px 32px', 'backgroundColor': '#1CD156', 'marginTop': '64px' }}>Sign In with Spotify</button>
            </div>

        );
    }
}

export default LoginPage;