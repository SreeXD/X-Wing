import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const SlideText = styled(motion.span)`
    margin-bottom: 3px;
`

export const SlideUnder = styled(motion.div)`
    height: 2px;
    width: 100%;
    background-color: #0f0f0f;
    border-radius: 2px;
`

export const SlideItem = styled.button`
    display: flex;
    flex-direction: column;
    width: 20%;
    margin: 3px 10px;
    opacity: 0.5;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    transition: 500ms cubic-bezier(.09,.67,.21,.95);

    ${props => props.active && css`
        width: 60%;
        opacity: 1;
        font-weight: 500;
    `}

    &:hover {
        opacity: 0.85;
    }
`

export const Slide = styled(motion.div)`
    display: flex;
    justify-content: center;
    width: 70vw;
    transition: filter 500ms;

    @media (max-width: 768px) {
        width: 80vw;
    }

    @media (max-height: 400px) {
        width: 80vw;

        span {
            font-size: 11px;
            font-weight: 400;
        }

        ${SlideUnder} {
            height: 1.5px;
        }
    }

    @media (max-width: 500px) {
        width: 90vw;

        span {
            font-size: 10px;
            font-weight: 400;
        }

        ${SlideUnder} {
            height: 1px;
        }
    }

    ${props => props.theme.dark && css`
        filter: invert(100%);
    `}
`

export const SlideContainer = styled.div`
    width: 100%;
    position: fixed;
    bottom: 10px;
    display: flex;
    justify-content: center;
`