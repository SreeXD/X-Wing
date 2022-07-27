import React, { useContext, useEffect } from 'react'
import gsap from 'gsap'

import WorldContext from '../../contexts/WorldContext.js'
import CrosshairEvents from '../Crosshair/CrosshairEvents'
import * as S from './SlideStyles.js'

import tone5 from '../../assets/tone5.wav'

const slideUnderVariants = {
    hidden: { 
        width: 0
    },

    show: {
        width: '100%',
        
        transition: {
            ease: [.75,.26,.33,.9],
            duration: 0.6
        }
    }
}

const slideTextVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },

    show: {
        opacity: 1,
        y: 0,

        transition: {
            ease: [.75,.26,.33,.9],
            duration: 0.5
        }
    }
}

const slideVariants = {
    hidden: { },

    show: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const Slide = (props) => {
    const { world, worldState, setWorldState } = useContext(WorldContext)
    const slideItems = []

    useEffect(() => {
        world.events['slide'] = ((mouseX, mouseY) => {
            const x = mouseX / window.innerWidth
            const delta = (window.innerWidth < 768 ? 30 : 60)
    
            gsap.to('.slide-item', { x: (x - 0.5) * delta })
            gsap.to('.slide-item span', { marginLeft: x * (delta / 4.0) })
        })

        return () => {
            delete world.events['slide']
        }
    }, [])

    for (let i = 0; i < 3; ++i) {
        slideItems.push(
            <S.SlideItem className='slide-item' key={i} active={i == worldState} {...CrosshairEvents} onClick={() => {  
                if (worldState != i) {
                    world.setState(i)
                    setWorldState(i)

                    const audio = new Audio()
                    audio.src = tone5
                    audio.volume = 0.2
                    audio.play()
                }
            }}>
                <S.SlideText variants={slideTextVariants}>0{i+1}</S.SlideText>
                <S.SlideUnder variants={slideUnderVariants} />
            </S.SlideItem>
        )
    }

    return (
        <S.SlideContainer>
            <S.Slide variants={slideVariants} initial='hidden' animate='show'>
                {slideItems}
            </S.Slide>
        </S.SlideContainer>
    )
}

export default Slide