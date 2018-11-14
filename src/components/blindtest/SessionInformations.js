import React, { Component } from 'react';
// import SpotifyWebApi from 'spotify-web-api-js';

// my components
// import AristSelector from './ArtistSelector';

// const spotifyApi = new SpotifyWebApi();

class SessionInformations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="informations">
                <p>You currently have {this.props.score} points</p>
                <p>Time left: {this.props.remainingTime}</p>
            </div>
        );
    }
}

export default SessionInformations;