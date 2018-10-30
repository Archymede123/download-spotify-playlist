import React, { Component } from 'react';



class PlaylistPage extends Component {

    // componentDidMount() {
    //     let playlistIndex = this.props.match.params.playlistId.match(/\d/)
    //     console.log(playlistIndex[0])
    //     let playlist = this.props.playlists.find(playlist => playlist.index === playlistIndex[0])
    // }

    render() {
        let playlistIndex = this.props.match.params.playlistId.match(/\d/)
        let playlist = this.props.playlists.find(playlist =>
            playlist.index.toString() === playlistIndex[0]
        )

        console.log(playlist)
        return (
            <div>
                <p>{playlist.name}</p>
            </div>

        );
    }
}

export default PlaylistPage;