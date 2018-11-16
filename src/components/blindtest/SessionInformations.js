import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// import SpotifyWebApi from 'spotify-web-api-js';

// css
import '../../css/animations.css'
import '../../css/SessionInformations.css'

// const spotifyApi = new SpotifyWebApi();

class SessionInformations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let timeLeft = this.props.remainingTime
        return (
            <div className="informations">
                <div>
                    You currently have
                    <span> {this.props.score}</span>
                    points
                </div>
                <div>
                    <span className='timing-container'>
                        Time left:
                        <TransitionGroup component='span' className='count'>
                            <CSSTransition
                                classNames='count'
                                key={timeLeft}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <span className='inline-block'>{timeLeft}</span>
                            </CSSTransition>
                        </TransitionGroup>
                    </span>

                </div>
            </div>
        );
    }
}

export default SessionInformations;