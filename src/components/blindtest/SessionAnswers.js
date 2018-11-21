import React, { Component } from 'react'
import Button from '../UI-components/Button'


class SessionAnswers extends Component {



    render() {
        return (
            <div className={!this.props.sessionOn ? "left-40 played-song" : "played-song"} style={this.props.style}>

                {this.props.answers.map((answer, key) =>
                    <div key={key} className='answer-content'>
                        <img
                            src={answer.imageUrl}
                            alt=""
                            className='answer-image'
                        />
                        <div className='answer-details'>
                            <p>{answer.artist}</p>
                            <p>{answer.song}</p>
                        </div>
                        <div className='answer-type'>
                            {answer.score} points
                        </div>
                    </div>
                )}
                <div className='total-points'>
                    total : {this.props.score} points
                </div>
                {!this.props.sessionOn &&
                    <Button
                        content="rejouer"
                        onClick={this.props.restartGame}
                    />
                }
            </div>
        )
    }
}

export default SessionAnswers