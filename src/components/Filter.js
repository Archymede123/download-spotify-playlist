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
                <input type="text" onKeyUp=
                    {e => this.props.onTextChange(e.target.value)} />

                <Rating
                    {...this.props}
                    emptySymbol={<FontAwesomeIcon icon={['far', 'star']} style={{ color: 'blue' }} />}
                    fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} />}
                    initialRating={this.props.ratingFilterValue}
                    onClick={this.handleClick}
                />
                <button onClick={this.props.resetRateFiltering}>reset</button>
            </div>
        );
    }
}

export default Filter;