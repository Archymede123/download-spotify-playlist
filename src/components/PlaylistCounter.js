import React, { Component } from 'react';

class PlaylistCounter extends Component {
    render() {
        return (
            <div className="playlist-counter">
                <p>
                    {this.props.playlists.length} playlists
                </p>
            </div >
        );
    }
}

export default PlaylistCounter;