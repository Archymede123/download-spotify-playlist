import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();





class PlaylistPickerCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistGenres: []
        }
    }

    handleClick = () => {
        this.setState({ isSelected: !this.state.isSelected })
        this.props.selectPlaylist(this.props.playlist)
    }

    componentDidMount() {

        spotifyApi.setAccessToken(this.props.access_token)
        this.props.playlist.songs.slice(0, 2).map(song => {
            let artistId = song.artistUri.match(/[^:]*$/)
            return spotifyApi.getArtist(artistId)
                .then(response => {
                    let playlistGenres = [...this.state.playlistGenres, response.genres]
                    this.setState({ playlistGenres })
                })
        })
    }

    render() {
        let playlist = this.props.playlist;
        let isSelected = this.props.selectedPlaylist === playlist ? true : false
        let genres = [...new Set(this.state.playlistGenres.flat())]
        return (
            <div
                onClick={this.handleClick}
                className={isSelected ? "playlist selected" : "playlist"}
            >
                <img src={playlist.imageUrl} alt="playlistImage" />
                <h3 className="playlist-title">{playlist.name}</h3>
                <div className="playlist-genres">
                    <p>Styles principaux :</p>
                    {genres.map((genre, key) =>
                        <span className="genre" key={key}>{genre}</span>
                    )}
                </div>
            </div>

        )
    }

}

export default PlaylistPickerCards