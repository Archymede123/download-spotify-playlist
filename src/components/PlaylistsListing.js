import React, { Component } from 'react';

//components
import Playlist from './Playlist';
import DownloadPlaylist from './DownloadPlaylist';
import HoursCounter from './HoursCounter.js';
import Filter from './Filter';
import PlaylistCounter from './PlaylistCounter';

class PlaylistsListing extends Component {
    constructor() {
        super();
        this.state = {
            filterString: '',
            filterRating: 0,
        }
    }

    updateFilteredRating = (rating) => {
        let filterRating = this.state.filterRating
        filterRating = rating
        this.setState({ filterRating })
    }

    resetRateFiltering = (event) => {
        this.setState({ filterRating: 0 })
    }

    componentDidMount() {
        this.props.history.push(`/`)
    }

    render() {
        let playlistsToRender =
            this.props.data.user &&
                this.props.data.playlists
                ? this.props.data.playlists.filter(playlist => {
                    let matchesPlaylist = playlist.name.toLowerCase().includes(
                        this.state.filterString.toLowerCase())
                    let matchesSong = playlist.songs.find(song =>
                        song.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
                    return matchesPlaylist || matchesSong
                }).filter(playlist => {
                    let matcheRating;
                    if (this.state.filterRating !== 0) {
                        matcheRating = playlist.rating === this.state.filterRating
                        return matcheRating
                    } else {
                        matcheRating = playlist
                    }
                    return matcheRating
                }) : []
        return (
            <div>
                <h1 >
                    {this.props.data.user}'s playlist
                </h1>
                <DownloadPlaylist
                    playlists={this.props.data.playlists}
                />
                <PlaylistCounter
                    playlists={playlistsToRender}
                />
                <HoursCounter
                    playlists={playlistsToRender}
                />
                <Filter
                    onTextChange={text => this.setState({ filterString: text })}
                    updateFilteredRating={this.updateFilteredRating}
                    resetRateFiltering={this.resetRateFiltering}
                    ratingFilterValue={this.state.filterRating}
                />
                <div className="playlistGrid">
                    {playlistsToRender.map((playlist, key) =>
                        <Playlist
                            playlist={playlist}
                            addTag={this.props.addTag}
                            key={key}
                            index={key}
                            history={this.props.history}
                            addPlaylistRating={this.props.addPlaylistRating}
                        />
                    )}
                </div>
            </div>
        )
    }
}


export default PlaylistsListing;