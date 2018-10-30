import React, { Component } from 'react';
import Playlist from './Playlist';

class PlaylistsListing extends Component {
    render() {
        return (
            <div>
                <div className="playlistGrid">
                    {this.props.playlists.map((playlist, key) =>
                        <Playlist
                            playlist={playlist}
                            addTag={this.addTag}
                            key={key}
                            index={key}
                            history={this.props.history}
                            addPlaylistRating={this.addPlaylistRating}
                        />
                    )}
                </div>
            </div>
        )
    }
}


export default PlaylistsListing;