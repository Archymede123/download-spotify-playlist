import React, { Component } from 'react';
import Blindtest from './Blindtest'

class BlindtestSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 0
        }
    }

    render() {
        return (
            <div>
                <p>Welcome to the blindtest</p>
                <Blindtest
                    access_token={this.props.access_token}
                    updateScore={this.props.updateScore}
                    gameStarted={this.props.gameStarted}
                />
            </div>

        );
    }
}

export default BlindtestSession;