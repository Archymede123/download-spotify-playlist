import React, { Component } from 'react';

class HoursCounter extends Component {
    render() {
        let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
            return songs.concat(eachPlaylist.songs)
        }, []);

        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return sum + eachSong.duration;
        }, 0)
        return (
            <div className="hours-counter">
                <p>
                    {Math.round(totalDuration / 60 / 60)} Hours
                </p>
            </div >
        );
    }
}

export default HoursCounter;