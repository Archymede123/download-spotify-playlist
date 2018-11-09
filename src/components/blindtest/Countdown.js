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
        if (this.props.answerIsCorrect) {
            return (
                <p>Good job, {this.state.remainingTime} before next song</p>
            )
        } else {
            return (
                <p>You have {this.state.remainingTime} left, hurry up motherfucker</p>
            )
        }

    }
}

export default Countdown;