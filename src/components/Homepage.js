import React, { Component } from 'react';

//components
import PlaylistCard from './PlaylistCard';
import DownloadPlaylist from './DownloadPlaylist';
// import HoursCounter from './HoursCounter.js';
import Filter from './Filter';
// import PlaylistCounter from './PlaylistCounter';
import Button from './UI-components/Button'

//css 
import '../css/Homepage.css';
import '../css/mobile.css'

class Homepage extends Component {
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

    resetRateFiltering = () => {
        this.setState({ filterRating: 0 })
    }

    playBlindtest = () => {
        this.props.history.push(`/blindtest`)
    }

    // componentDidMount() {
    //     this.props.history.push(`/`)
    // }

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
            <div className="homepage">
                <div className="homepage-header">
                    <div className="pagetitle">
                        <h1 className="title">Des playlist encore plus mieux</h1>
                        <p className="subtitle">Jouez avec la musique, c'est super </p>
                    </div>
                    <div className="searchbox">
                        <Filter
                            onTextChange={text => this.setState({ filterString: text })}
                            updateFilteredRating={this.updateFilteredRating}
                            resetRateFiltering={this.resetRateFiltering}
                            ratingFilterValue={this.state.filterRating}
                        />
                    </div>
                    <div className="userinfos">
                        <div className="user-desc">
                            <p className="usertype">user</p>
                            <p className="username">{this.props.data.user[0]}</p>
                        </div>
                        <img className="user-pic" src={this.props.data.user[2]} alt="" />
                    </div>
                </div>
                <div className="playlists-details">
                    <Button content="un blindtest ?" onClick={this.playBlindtest} />
                    {/* <PlaylistCounter
                        playlists={playlistsToRender}
                    />
                    <HoursCounter
                        playlists={playlistsToRender}
                    /> */}
                    <DownloadPlaylist
                        playlists={this.props.data.playlists}
                    />

                </div>
                <div className="playlistGrid">
                    {playlistsToRender.map((playlist, key) =>
                        <PlaylistCard
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


export default Homepage;