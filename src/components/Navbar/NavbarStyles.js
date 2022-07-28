import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const NavbarRight = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 5px;
    transform-origin: right center;

    @media (max-width: 768px) {
        transform: scale(0.8);
    }
    
    @media (max-height: 500px) {
        transform: scale(0.8);
    }

    @media (max-width: 450px) {
        transform: scale(0.65);
    }
`

export const Navbar = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    z-index: 1;

    @media (max-width: 450px) {
        padding: 2px 6px;
    }
`

export const MusicButton = styled(motion.button)`
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
`

export const MusicVideo = styled.video`
    opacity: 0.5;
    transition: opacity 300ms;
    width: 34px;
    transition: filter 400ms ease-out;

    ${ props => props.theme.dark && css`
        filter: invert(100%);
    `}

    @media (max-width: 450px) {
        width: 30px;
    }
`

export const ThemeIcon = styled.img`
    height: 36px;
    opacity: 0.8;
    cursor: pointer;
    transition: filter 400ms ease-out;
    margin-left: 5px;

    @media (max-width: 450px) {
        margin-left: 0;
        height: 24px;
    }
`

export const ThemeButton = styled(motion.button)`
    outline: none;
    border: none;
    background: none;
    margin-right: 40px;

    @media (max-width: 450px) {
        margin-right: 20px;
    }
`

export const PolyText = styled.p`
    position: relative;
    font-size: 11px;
    left: -20%;
    transition: left 300ms;
    font-weight: 500;
`

export const PolyArrow = styled(motion.svg)`
    position: relative;
    height: 40px;
    transition: left 300ms, fill 300ms;

    &:nth-child(1) {
        left: -100%;
    }

    &:nth-child(3) {
        left: -8%;
    }
`

export const PolyButton = styled.a`
    position: relative;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    font-weight: 400;
    transition: color 300ms;
    padding: 0 12px;
    height: 38px;
    clip-path: polygon(0 50%, 23px 0, 100% 0, 100% 50%, calc(100% - 23px) 100%, 0 100%);
    background-color: #f8f8f8;

    &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        background-color: #080808;
        width: 100%;
        height: 100%;
        left: -100%;
        transition: left 300ms;
        z-index: -1;
    }

    &:hover {
        color: #f8f8f8;

        & svg:nth-child(1) {
            fill: #f8f8f8;
            left: calc(25% - 25px);
        }

        & p:nth-child(2) {
            left: 20%;
        }

        & svg:nth-child(3) {
            left: 100%;
        }

        &:before {
            left: 0;
        }
    }
`

export const PolyButtonContainer = styled(motion.div)`
    position: relative;
    right: 0;
    background-color: #0f0f0f;
    clip-path: polygon(0 50%, 24px 0, 100% 0, 100% 50%, calc(100% - 24px) 100%, 0 100%);
    transition: filter 500ms, right 500ms;
    padding: 2.1px;

    ${ props => props.theme.dark && css`
        filter: invert(100%);
    `}
`