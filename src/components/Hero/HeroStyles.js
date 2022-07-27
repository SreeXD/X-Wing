import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const HeroText = styled(motion.h1)`
    font-size: ${props => props.fontSize}px;

    @media (max-width: 1200px) {
        font-size: ${props => props.fontSize * 0.7}px;
    }

    @media (max-width: 900px) {
        font-size: ${props => props.fontSize * 0.6}px;
    }

    @media (max-width: 650px) {
        font-size: ${props => props.fontSize * 0.45}px;
    }

    @media (max-width: 450px) {
        font-size: ${props => props.fontSize * 0.35}px;
    }
`

export const HeroTextsLeft = styled.div`
    position: absolute;
    left: 10%;

    @media (max-width: 900px) {
        left: 35px;
    }

    @media (max-width: 650px) {
        left: 25px;
    }

    @media (max-width: 450px) {
        left: 15px;
    }
`

export const HeroTextsRight = styled.div`
    position: absolute;
    right: 10%;

    @media (max-width: 900px) {
        right: 35px;
    }

    @media (max-width: 650px) {
        right: 25px;
    }

    @media (max-width: 450px) {
        right: 15px;
    }
`

export const Hero = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    color: #181818;
    transition: color 400ms;    
    display: flex;
    align-items: center;

    ${ props => props.theme.dark && css`
        color: #e8e8e8;
    `}
`