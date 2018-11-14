import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import className from 'classnames';

// js 
import { shuffle } from '../../api/shuffle';

// css 
import '../../css/artistSelector.css';

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
                imageUrl,
                isSelected: false
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
                    let imageUrl = artist.images[1] ? artist.images[1].url : require('../../images/noImageAvailable.png')
                    let artistSelection = [...this.state.artistSelection, {
                        name: artist.name,
                        imageUrl,
                        popularity: artist.popularity,
                        isSelected: false
                    }]
                    return this.setState({ artistSelection: shuffle(artistSelection) })
                })
            })
    }

    selectAnswer = (event) => {
        if (this.state.userCanSelect) {
            let artistName = event.currentTarget.dataset.artist
            this.props.submitAnswer(artistName)
            let artistSelection = this.state.artistSelection
            let artistIndex = artistSelection.findIndex(artist => artist.name === artistName)
            artistSelection[artistIndex].isSelected = true
            this.setState({ userCanSelect: false })
        }
    }

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
        var artistClass = className({
            artist: true,
            hover: this.state.userCanSelect
        })
        return (
            <div>
                <p className="instructions">L'artiste est ...</p>
                <ul className="artists">
                    {artists.map((artist, key) =>
                        <li
                            key={key}
                            onClick={this.selectAnswer}
                            data-artist={artist.name}
                            className={artist.isSelected ? "artist selected" : artistClass}
                        >
                            <div className="artist-avatar">
                                <img
                                    src={artist.imageUrl}
                                    alt={artist.name}
                                />
                            </div>

                            <p className="artist-name">{artist.name}</p>
                        </li>
                    )}
                </ul>
            </div>
        )

    }
}


export default AristSelector;