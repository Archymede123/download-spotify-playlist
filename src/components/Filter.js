import React, { Component } from 'react';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Filter extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(rating) {
        this.props.updateFilteredRating(rating)
    }

    render() {
        return (
            <div>
                <p className="search-indication">Search a playlist</p>
                <input className="search-input" type="text" onKeyUp=
                    {e => this.props.onTextChange(e.target.value)} />

                <div className="rating">
                    <p className="search-indication">Filter playlists</p>
                    <Rating
                        className="stars"
                        {...this.props}
                        emptySymbol={<FontAwesomeIcon icon={['far', 'star']} />}
                        fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} style={{ color: '#1DB954' }} />}
                        initialRating={this.props.ratingFilterValue}
                        onClick={this.handleClick}
                    />
                    <button className="reset-stars" onClick={this.props.resetRateFiltering}>reset</button>
                </div>

            </div>
        );
    }
}

export default Filter;