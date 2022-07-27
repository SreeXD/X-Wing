import React, { useEffect, useContext } from 'react'
import gsap from 'gsap'

import WorldContext from '../../contexts/WorldContext.js'

import * as S from './HeroStyles.js'

const textAnimate = (delay) => ({
    initial: {
        y: 50,
        opacity: 0,
        scale: 1.07
    },
    
    animate: {  
        y: 0,
        opacity: 1,
        scale: 1
    },

    exit: {
        y: 50,
        opacity: 0,
        transition: {
            ease: [.2,.52,.45,.88],
            duration: 0.5,
            delay: 0.2 - delay
        }
    },

    transition: {
        ease: [.2,.52,.45,.88],
        duration: 0.7,
        delay: 0.2 + delay
    }
})

const Hero = () => {
    const { world } = useContext(WorldContext)

    useEffect(() => {
        const hero = document.querySelector('#hero')
        const nav = document.querySelector('#navbar')

        world.events['hero'] = ((mouseX, mouseY) => {
            if (world.state == 0) {
                const x = (mouseX / window.innerWidth - 0.5) * 2.0
                const y = -(mouseY / window.innerHeight - 0.5) * 2.0

                gsap.to('#hero-text-left', { rotationY: -x * Math.PI / 6.0 + 'rad', duration: 0.8 })
                gsap.to('#hero-text-right', { rotationY: -x * Math.PI / 6.0 + 'rad', duration: 0.8 })

                gsap.to('#hero-text-left', { rotationX: -y * Math.PI / 8.0 + 'rad', duration: 0.8 })
                gsap.to('#hero-text-right', { rotationX: -y * Math.PI / 8.0 + 'rad', duration: 0.8 })
            }
        })

        return () => {
            delete world.events['hero']
        }
    }, [])

    return (
        <S.Hero id='hero'>
            <S.HeroTextsLeft id='hero-text-left'>
                <S.HeroText fontSize={25} {...textAnimate(0)}>Introducing</S.HeroText>
                <S.HeroText fontSize={40} {...textAnimate(0.05)}>X-Wing T-65</S.HeroText>
            </S.HeroTextsLeft>

            <S.HeroTextsRight id='hero-text-right'>
                <S.HeroText fontSize={30} {...textAnimate(0.1)}>The Empire's</S.HeroText>
                <S.HeroText fontSize={25} {...textAnimate(0.15)}>Greatest attack unit</S.HeroText>
            </S.HeroTextsRight>
        </S.Hero>
    )
}

export default Hero