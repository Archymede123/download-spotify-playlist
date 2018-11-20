import React, { Component } from 'react'




class SessionAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistGenres: []
        }
    }


    render() {
        return (
            <ul className="played-song">
                {this.props.answers.map((answer, key) =>
                    <li key={key} className='answer-content'>
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
                    </li>
                )}

            </ul>
        )
    }

}

export default SessionAnswers