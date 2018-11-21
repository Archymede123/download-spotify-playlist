import React, { Component } from 'react'

class SessionAnswers extends Component {
    render() {
        return (
            <div className="played-song" style={this.props.style}>
                <div>
                    Tu as
                    <span> {this.props.score} </span>
                    points
                </div>
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
            </div>
        )
    }
}

export default SessionAnswers