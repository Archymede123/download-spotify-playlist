import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// js 
import { shuffle } from '../../api/shuffle';

const spotifyApi = new SpotifyWebApi();

class AristSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistSelection: [],
            userCanSelect: true
        }
    }

    getArtistImage = (artistId) => {
        spotifyApi.getArtist(artistId).then(response => {
            let imageUrl = response.images[1] ? response.images[1].url : ""
            let currentArtist = {
                name: response.name,
                imageUrl
            }
            let artistSelection = [...this.state.artistSelection, currentArtist]
            this.setState({ artistSelection: shuffle(artistSelection) })
        }
        )
    }

    getRelatedArtist = (artistId) => {
        spotifyApi.getArtistRelatedArtists(artistId)
            .then(response => {
                response.artists.slice(0, 3).map(artist => {
                    let imageUrl = artist.images[1] ? artist.images[1].url : ""
                    let artistSelection = [...this.state.artistSelection, {
                        name: artist.name,
                        imageUrl,
                        popularity: artist.popularity
                    }]
                    return this.setState({ artistSelection: shuffle(artistSelection) })
                })
            })
    }

    selectAnswer = (event) => {
        if (this.state.userCanSelect) {
            this.props.submitAnswer(event.currentTarget.dataset.artist)
            this.setState({ userCanSelect: false })
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.userCanSelect !== nextState.userCanSelect) {
    //         return false
    //     } if (this.props.currentData !== nextProps.currentData) {
    //         return false
    //     }
    //     else {
    //         return true;
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (prevProps.currentData !== this.props.currentData) {
            this.setState({
                artistSelection: [],
                userCanSelect: true
            })
            this.getRelatedArtist(this.props.currentData.artist.id)
            this.getArtistImage(this.props.currentData.artist.id)
        }
    }

    componentDidMount() {
        this.getRelatedArtist(this.props.currentData.artist.id)
        this.getArtistImage(this.props.currentData.artist.id)
    }
    render() {
        let artists = this.state.artistSelection
        return (
            <div>
                <p>L'artiste est ...</p>
                <ul>
                    {artists.map((artist, key) =>
                        <li key={key} onClick={this.selectAnswer} data-artist={artist.name}>
                            <img
                                src={artist.imageUrl}
                                alt={artist.name}
                                className="artist-avatar" />
                            {artist.name}
                        </li>
                    )}
                </ul>
            </div>
        )

    }
}


export default AristSelector;