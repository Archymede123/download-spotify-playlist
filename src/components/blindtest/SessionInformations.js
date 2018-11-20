import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'


// css
import '../../css/animations.css'
import '../../css/SessionInformations.css'



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
                    Tu as
                    <span> {this.props.score} </span>
                    points
                </div>
                <div>
                    <span className='timing-container'>
                        Temps restant :&nbsp;
                        <TransitionGroup component='span' className='count'>
                            <CSSTransition
                                classNames='count'
                                key={timeLeft}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <span className='inline-block'> {timeLeft} </span>
                            </CSSTransition>
                        </TransitionGroup>
                        &nbsp; secondes
                    </span>

                </div>
            </div>
        );
    }
}

export default SessionInformations;