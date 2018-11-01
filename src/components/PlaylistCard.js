import React, { Component } from 'react';

//components
// import TagManager from './TagManager';
import Rating from 'react-rating';
import Button from './UI-components/Button'

//fontawsome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

//css 
import '../css/PlaylistCards.css';

// add icon to the library
library.add(faStarSolid, faStarRegular)


class PlaylistCard extends Component {

  handleButtonClick = () => {
    let playlist = this.props.playlist
    let playlistNameConcatenated = playlist.name.replace(/\//g, " ").split(" ").join('').toLowerCase()
    this.props.history.push(`/playlist=${playlist.index}-${playlistNameConcatenated}`)
  }

  handleRatingClick = (rating) => {
    this.props.addPlaylistRating(this.props.playlist.index, rating)
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
        <Button onClick={this.handleButtonClick} content="see playlist" />
        {/* <TagManager addTag={this.props.addTag} index={this.props.index} /> */}
        <p className="search-indication">add a rating</p>
        <Rating
          className="playlist-rating"
          emptySymbol={<FontAwesomeIcon icon={['far', 'star']} />}
          fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} style={{ color: '#1DB954' }} />}
          initialRating={playlist.rating}
          onClick={this.handleRatingClick}
        />
      </div>

    );
  }
}

export default PlaylistCard;