import React, { Component } from 'react';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeToGuess: 10
        }
    }

    startCountdown = () => {
        this.interval = setInterval(() => {
            let timeToGuess = this.state.timeToGuess
            timeToGuess -= 1
            this.setState({ timeToGuess })
            if (timeToGuess < 1) {
                clearInterval(this.interval)
                this.props.stopCountdown()
            }
        }, 1000)
    }

    componentDidMount() {
        this.startCountdown()
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <p>You have {this.state.timeToGuess} left, hurry up motherfucker</p>
        );
    }
}

export default Countdown;