import React, { useEffect, useRef, useContext } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

import CrosshairEvents from '../Crosshair/CrosshairEvents.js'
import WorldContext from '../../contexts/WorldContext.js'
import * as S from './NavbarStyles'

import musicVideo from '../../assets/music.mp4'
import themeIcon from '../../assets/themeIcon.png'
import starsWarMusic from '../../assets/music.mp3'
import tone8 from '../../assets/tone8.wav'

const animateNav = (x, delay) => ({
    initial: {
        x,
        opacity: 0
    },

    animate: {
        x: 0,
        opacity: 1
    },

    transition: {
        ease: [.21,.6,.45,.84],
        duration: 0.6,
        delay: delay + 0.05
    }
})

const animatePolyButton = {
    initial: { 
        x: -5, 
        opacity: 0 
    },
    
    animate: { 
        x: 0, 
        opacity: 1 
    },
    
    transition: { 
        duration: 0.5, 
        delay: 0.3, 
        ease: [.75,.26,.33,.9] 
    }
}

const Navbar = (props) => {
    const { world } = useContext(WorldContext)
    const playing = useRef(true)

    const onPolyButtonEnter = () => {
        const audio = new Audio()
        audio.src = tone8 
        audio.volume = 0.1
        audio.play()

        CrosshairEvents.onMouseEnter()
    }

    useEffect(() => {
        const musicAudioEle = document.querySelector('#starwars-music')
        const musicButton = document.querySelector('#music-button')
        const musicVideoEle = musicButton.firstChild 

        musicAudioEle.volume = 0.2
        musicVideoEle.style.opacity = 0.8
        musicVideoEle.play()
        const played = musicAudioEle.play()

        if (played) {
            played.catch(e => {
                musicVideoEle.style.opacity = 0.5
                musicVideoEle.pause()
                playing.current = false 
            })
        }

        musicAudioEle.addEventListener('ended', () => {
            musicVideoEle.style.opacity = 0.5
            musicVideoEle.pause()
            playing.current = false 
        })
        
        musicButton.addEventListener('click', () => {
            playing.current = !playing.current 

            if (playing.current) {
                musicVideoEle.style.opacity = 0.8
                musicVideoEle.play()
                musicAudioEle.play()
            }

            else {
                musicVideoEle.style.opacity = 0.5
                musicVideoEle.pause()
                musicAudioEle.pause()
            }
        })

        world.events['nav'] = (mouseX, mouseY) => {
            const x = mouseX / window.innerWidth 
            gsap.to('#theme-icon', { rotation: (x - 0.5) * -180 })
        }

        return () => {
            delete world.events['nav']
        }
    }, [])

    return (
        <S.Navbar id='navbar'>
            <S.ThemeButton {...animateNav(-20, 0.4)} {...CrosshairEvents} onClick={() => {
                props.changeTheme()
            }}>
                <S.ThemeIcon id='theme-icon' src={themeIcon} />
            </S.ThemeButton>

            <S.MusicButton id='music-button' {...animateNav(-20, 0.3)} {...CrosshairEvents}>
                <S.MusicVideo src={musicVideo} loop />
            </S.MusicButton>

            <S.NavbarRight>
                <audio id='starwars-music' src={starsWarMusic}></audio>

                <S.PolyButtonContainer id='get-button' {...animateNav(20, 0.3)} onMouseLeave={CrosshairEvents.onMouseLeave} onMouseEnter={onPolyButtonEnter}>
                    <S.PolyButton> 
                        <S.PolyArrow version="1.0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 359.000000 410.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,410.000000) scale(0.100000,-0.100000)" stroke="none">
                                <path d="M3117 2256 l-25 -45 86 -50 87 -51 -1632 0 -1633 0 0 -55 0 -55 1642
                                -2 1643 -3 -88 -59 c-48 -33 -87 -62 -87 -65 0 -4 11 -23 26 -44 15 -23 30
                                -35 37 -30 57 34 377 257 377 262 0 3 -78 51 -172 106 -95 54 -187 107 -204
                                117 l-32 19 -25 -45z"/>
                            </g>
                        </S.PolyArrow>
                
                        <S.PolyText>
                            <motion.span {...animatePolyButton}>
                                GET ONE
                            </motion.span>
                        </S.PolyText>

                        <S.PolyArrow {...animatePolyButton} version="1.0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 359.000000 410.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,410.000000) scale(0.100000,-0.100000)" stroke="none">
                                <path d="M3117 2256 l-25 -45 86 -50 87 -51 -1632 0 -1633 0 0 -55 0 -55 1642
                                -2 1643 -3 -88 -59 c-48 -33 -87 -62 -87 -65 0 -4 11 -23 26 -44 15 -23 30
                                -35 37 -30 57 34 377 257 377 262 0 3 -78 51 -172 106 -95 54 -187 107 -204
                                117 l-32 19 -25 -45z"/>
                            </g>
                        </S.PolyArrow>
                    </S.PolyButton>
                </S.PolyButtonContainer>
            </S.NavbarRight>
        </S.Navbar>
    )
}

export default Navbar