import React, { Component } from 'react';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeToGuess: 10
        }
    }

    startCountdown = () => {
        setInterval(() => {
            let timeToGuess = this.state.timeToGuess
            timeToGuess -= 1
            this.setState({ timeToGuess })
        }, 1000)
    }

    componentDidMount() {
        this.startCountdown()
    }

    componentDidUpdate() {
        (this.state.timeToGuess === 0) && this.props.stopCountdown()
    }

    render() {
        return (
            <p>You have {this.state.timeToGuess} left, hurry up motherfucker</p>
        );
    }
}

export default Countdown;