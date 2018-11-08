import React, { Component } from 'react';

class Countdown extends Component {
    constructor(props) {
        super(props);
        let timeToGuess = this.props.timeToGuess
        this.state = {
            timeToGuess,
            remainingTime: timeToGuess
        }
    }

    startCountdown = () => {
        this.interval = setInterval(() => {
            let remainingTime = this.state.remainingTime
            remainingTime -= 1
            this.setState({ remainingTime })
            if (remainingTime < 1) {
                clearInterval(this.interval)
                // remainingTime = this.state.timeToGuess
                // this.startCountdown()
            }
        }, 1000)
    }

    restartCountdown = () => {
        clearInterval(this.interval)
        this.startCountdown()
    }

    componentDidMount() {
        this.startCountdown()
    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <p>You have {this.state.remainingTime} left, hurry up motherfucker</p>
        );
    }
}

export default Countdown;