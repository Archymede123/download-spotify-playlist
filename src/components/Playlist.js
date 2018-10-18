import React, { Component } from 'react';
import '../css/Playlist.css';
import TagManager from './TagManager';


class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    let hasTags = playlist.tags === undefined ? false : true
    console.log(hasTags)
    let tagList;

    if (hasTags) {
      tagList =
        <div className='tagList'> Tags:
            {playlist.tags.map(tag =>
            <span>{`${tag} `}</span>
          )}
        </div>
    }

    console.log(tagList)

    return (
      <div className="playlist">
        <img src={playlist.imageUrl} alt="playlist" />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.slice(0, 3).map(song =>
            <li>{song.name}</li>
          )}
        </ul>
        {tagList}
        <div className="buttons">
          <p className="cta">see playlist</p>
        </div>
        <TagManager addTag={this.props.addTag} index={this.props.index} />


      </div>

    );
  }
}

export default Playlist;