import React, { Component } from 'react';
import '../css/Playlist.css';
import TagManager from './TagManager';
import Rating from 'react-rating';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

// add icon to the library
library.add(faStarSolid, faStarRegular)


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    let playlist = this.props.playlist
    let playlistNameConcatenated = playlist.name.replace(/\//g, " ").split(" ").join('').toLowerCase()
    this.props.history.push(`/playlist=${playlist.index}-${playlistNameConcatenated}`);
  }

  render() {
    let playlist = this.props.playlist;
    let hasTags = playlist.tags === undefined ? false : true
    let tagList;

    if (hasTags) {
      tagList =
        <div className='tagList'> Tags:
            {playlist.tags.map(tag =>
            <span>{`${tag} `}</span>
          )}
        </div>
    }

    return (
      <div className="playlist">
        <img src={playlist.imageUrl} alt="playlist" />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.slice(0, 3).map((song, key) =>
            <li key={key}>{song.name}</li>
          )}
        </ul>
        {tagList}
        <div className="buttons">
          <button className="cta" onClick={this.handleClick}>see playlist</button>
        </div>
        <TagManager addTag={this.props.addTag} index={this.props.index} />
        <Rating
          className="playlist-rating"
          emptySymbol={<FontAwesomeIcon icon={['far', 'star']} style={{ color: 'blue' }} />}
          fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} />}
          initialRating={playlist.rating}
          onClick={this.handleClick}
        />
      </div>

    );
  }
}

export default Playlist;