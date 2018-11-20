import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import className from 'classnames'
import { Motion, spring } from 'react-motion'
// import styled from 'styled-components'

import Button from '../UI-components/Button'
import ArtistCard from './ArtistCard'


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
                isSelected: false,
                isTheAnswer: true
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
                        isSelected: false,
                        isTheAnswer: false
                    }]
                    return this.setState({
                        artistSelection: shuffle(artistSelection),
                        answerImageUrl: imageUrl,
                    })
                })
            })
    }

    selectAnswer = (event) => {
        if (this.state.userCanSelect) {
            let artistName = event.currentTarget.dataset.artist
            this.props.submitAnswer(artistName, this.state.answerImageUrl)
            let artistSelection = this.state.artistSelection
            let artistIndex = artistSelection.findIndex(artist => artist.name === artistName)
            artistSelection[artistIndex].isSelected = true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentData !== this.props.currentData) {
            this.setState({
                artistSelection: [],
                userCanSelect: true,
            })
            this.getRelatedArtist(this.props.currentData.artist.id)
            this.getArtistImage(this.props.currentData.artist.id)
        }

        if (prevProps.answers !== this.props.answers) {
            let currentAnswer = this.props.answers.slice(-1)[0]
            this.setState({
                currentAnswer: currentAnswer,
                answerWasCorrect: currentAnswer.correct,
                userCanSelect: false
            })
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
            <div style={this.props.style}>
                <p className="instructions">L'artiste est ...</p>
                <ul className="artists">
                    {artists.map((artist, key) =>
                        <li
                            key={key}
                            onClick={this.selectAnswer}
                            data-artist={artist.name}
                            className={artist.isSelected ? "artist selected" : artistClass}
                        >
                            <ArtistCard
                                artistName={artist.name}
                                image={artist.imageUrl}
                                isTheAnswer={artist.isTheAnswer}
                                isSelected={artist.isSelected}
                                userCanSelect={this.state.userCanSelect}
                                currentAnswer={this.state.currentAnswer}
                            />
                        </li>
                    )}
                </ul>
                {!this.state.userCanSelect &&
                    <Motion
                        defaultStyle={{ scale: 0 }}
                        style={{ scale: spring(1) }}
                    >
                        {(style) => (
                            <Button
                                onClick={this.props.nextSong}
                                content='prochain morceau'
                                style={{ transform: `scale(${style.scale})` }}
                            />
                        )}

                    </Motion>

                }

            </div>
        )

    }
}


export default AristSelector;