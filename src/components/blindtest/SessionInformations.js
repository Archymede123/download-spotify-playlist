import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'


// css
import '../../css/animations.css'
import '../../css/SessionInformations.css'

const TimerWrapper = styled.div`
    margin: 64px auto 0
    position: relative;
    width: 232px;

    &::before {
        content:"";
        position: absolute;
        height: 2px;
        width: ${(props) => ((120 - props.timeLeft) / 120) * 100}%;
        background: var(--color-primary);
        bottom: -16px;
        left: 0;
        transition: width ease-in-out 1500ms;
    }
`

class SessionInformations extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let timeLeft = this.props.remainingTime
        return (
            <TimerWrapper
                timeLeft={timeLeft}
            >
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
            </TimerWrapper>
        );
    }
}

export default SessionInformations;