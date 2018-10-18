import React, { Component } from 'react';

class Filter extends Component {
    render() {
        return (
            <div>
                <input type="text" onKeyUp=
                    {e => this.props.onTextChange(e.target.value)} />
            </div>
        );
    }
}

export default Filter;