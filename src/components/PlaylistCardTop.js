import React, { Component } from 'react';



class PlaylistCardTop extends Component {
    render() {
        let playlist = this.props.playlist;
        return (
            <div className="playlist "
                onClick={this.handleClick} >
                <img src={playlist.imageUrl} alt="playlistImage" />
                <h3>{playlist.name}</h3>
                <ul>
                    {playlist.songs.slice(0, 3).map((song, key) =>
                        <li key={key}>{song.name}</li>
                    )}
                </ul>
                {this.props.children}
            </div>
        )
    }

}

export default PlaylistCardTop