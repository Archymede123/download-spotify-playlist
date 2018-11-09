import React, { Component } from 'react';
import PlaylistCardTop from '../PlaylistCardTop';



class PlaylistPickerCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleClick = () => {
        this.setState({ isSelected: !this.state.isSelected })
        this.props.selectPlaylist(this.props.playlist)
    }

    render() {
        let playlist = this.props.playlist;
        let isSelected = this.props.selectedPlaylist === playlist ? true : false
        return (
            <div
                onClick={this.handleClick}
                className={isSelected ? "playlist selected" : "playlist"}>
                <PlaylistCardTop playlist={playlist} />
            </div>

        )
    }

}

export default PlaylistPickerCards