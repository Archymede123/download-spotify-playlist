import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import Button from './UI-components/Button'

class DownloadPlaylist extends Component {
    render() {
        let playlists = this.props.playlists
        // let songs = playlistsSongs[0].songs

        if (this.props.playlists) {
            let playlistsToDownload = []
            playlists.forEach(playlist => {
                let playlistToDownload = []
                playlistToDownload.push(playlist.name)
                playlist.songs.forEach(song => {
                    playlistToDownload.push(song.name)
                })
                playlistsToDownload.push(playlistToDownload)
            })
            return (
                < CSVLink data={playlistsToDownload}
                    filename={"my-file.csv"}
                    target="_blank"
                    className="download-CSV" >
                    <Button content="Download playlist as CSV" />
                </CSVLink >
            )
        }
        return (null)
    }
}

export default DownloadPlaylist;