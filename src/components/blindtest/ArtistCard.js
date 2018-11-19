import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import styled from 'styled-components'
import className from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import '../../css/ArtistCard.css';


const Wrapper = styled.div`
    background: ${(props) => props.isSelected && props.isTheAnswer && 'var(--color-secondary)'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
            all: true,
            active: !userCanSelect & isSelected || !userCanSelect & isTheAnswer,
            winner: !userCanSelect && isTheAnswer,
            loser: !userCanSelect && isSelected && !isTheAnswer
        })
        return (
            <Wrapper
                className={!isTheAnswer && artistClass}
                isSelected={isSelected}
                isTheAnswer={isTheAnswer}
            >
                {isSelected && isTheAnswer && <p>Bravo</p>}
                {isSelected && !isTheAnswer && <p>Ah que non</p>}
                {!userCanSelect && isTheAnswer && <p>C'était moi</p>}

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
                        defaultStyle={{ top: 100 }}
                        style={{ top: spring(0) }}
                    >
                        {(style) => (
                            <CorrectAnswerBackground
                                className={artistClass}
                                style={{ top: `${style.top}%` }}
                            >
                                <p>LA BONNE RÉPONSE</p>
                                <p>Morceau: {currentAnswer.song}</p>
                                <p>Temps de réponse: {currentAnswer.timeSpent} </p>
                                <p>Nombre de point: {currentAnswer.score} </p>
                            </CorrectAnswerBackground>
                        )}

                    </Motion>
                }

                {!userCanSelect && !isTheAnswer && isSelected &&
                    <p>LOOSER</p>
                }
            </Wrapper>
        )
    }
}


export default ArtistCard;