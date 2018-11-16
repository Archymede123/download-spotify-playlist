import React, { Component } from 'react'
// import className from 'classnames'
import { Motion, spring } from 'react-motion'
import styled from 'styled-components'


const Wrapper = styled.div`
`
// const ArtistImageWrapper = styled.div`
//     position: relative;
//     &::after {
//         position: absolute;
//         height: 80px;
//         width: 80px;
//         background: var(--color-primary);
//         border-radius: 50%;
//         top: 0;
//         left: 0;
//         z-index: -1;
//     }

//     &:hover {
//         &::after {
//             content: "";
//             transform: scale(1.2);
//             transform-origin: center;
//             transition: content ease-in-out .15s;
//         }

//         .image {
//             box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 
//                         0 6px 30px 5px rgba(0,0,0,0.12), 
//                         0 8px 10px 0 rgba(0,0,0,0.20);
//         }
//     }

// `

const ArtistImage = styled.div`
    background: url('${(props) => props.image}');
    border-radius: 50%;
    height: 80px;
    width: 80px;
    z-index: 3;
    position: relative;
    background-size: cover;
`



class ArtistCard extends Component {
    render() {
        const {
            image,
            artistName
        } = this.props
        return (
            <Wrapper>
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
            </Wrapper>
        )
    }
}


export default ArtistCard;