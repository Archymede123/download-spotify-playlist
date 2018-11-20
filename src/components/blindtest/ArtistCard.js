import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import styled from 'styled-components'
import className from 'classnames'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

import '../../css/ArtistCard.css';


const Wrapper = styled.div`
    
    position: relative
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .feedback-message {
        position: absolute;
        top: -48px;
        left: 50%;
        transform: translateX(-50%);
        font-family: arial-black;
        text-transform: uppercase;
        width: 90%;
    }
`

const ArtistImage = styled.div`
    background: url('${(props) => props.image}');
    border-radius: 50%;
    height: 80px;
    width: 80px;
    z-index: 3;
    position: relative;
    background-size: cover;
`

const CorrectAnswerBackground = styled.div``


class ArtistCard extends Component {



    render() {

        const {
            image,
            artistName,
            isSelected,
            isTheAnswer,
            userCanSelect,
            currentAnswer
        } = this.props

        var artistClass = className({
            all: !isTheAnswer,
            active: !userCanSelect & isSelected || !userCanSelect & isTheAnswer,
            winner: !userCanSelect && isTheAnswer,
            loser: !userCanSelect && isSelected && !isTheAnswer
        })
        return (
            <Wrapper
                className={artistClass}
                isSelected={isSelected}
                isTheAnswer={isTheAnswer}
            >
                {isSelected && isTheAnswer && <p className='feedback-message'>Bravo</p>}
                {isSelected && !isTheAnswer && <p className='feedback-message'>Ah que non</p>}
                {!userCanSelect && isTheAnswer && !isSelected && <p className='feedback-message'>C'était moi</p>}

                <Motion
                    defaultStyle={{ scaleX: 0 }}
                    style={{ scaleX: spring(1) }}
                >
                    {(style) => (
                        <div className='artist-avatar'>
                            <ArtistImage
                                className="image"
                                image={image}
                                style={{ transform: `scale(${style.scaleX})` }}
                            />
                        </div>
                    )}
                </Motion>
                <p className="artist-name">{artistName}</p>
                {!userCanSelect && isTheAnswer &&
                    <Motion
                        defaultStyle={{ top: 200 }}
                        style={{ top: spring(-64) }}
                    >
                        {(style) => (
                            <CorrectAnswerBackground
                                className="winner-background"
                                style={{ top: `${style.top}px` }}
                            >
                                <p className="answer-section">
                                    <span className="answer-type">Morceau:</span>
                                    <span className='answer-displayed'>{currentAnswer.song}</span>
                                </p>
                                <p className="answer-section">
                                    <span className="answer-type">Temps de réponse:</span>
                                    <span className='answer-displayed'>{currentAnswer.timeSpent} secondes</span>
                                </p>
                                <p className="answer-section">
                                    <span className="answer-type">Nombre de point:</span>
                                    <span className='answer-displayed'>{currentAnswer.score}</span>
                                </p>
                            </CorrectAnswerBackground>
                        )}

                    </Motion>
                }

            </Wrapper>
        )
    }
}


export default ArtistCard;