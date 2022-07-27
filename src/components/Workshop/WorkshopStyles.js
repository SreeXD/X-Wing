import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const IndicatorText = styled.span`
    transform: rotate(45deg);
    color: white;
    opacity: 0;
    font-size: 14px;
    pointer-events: none;

    @media (max-width: 900px) {
        font-size: 11px;
    }

    @media (max-width: 450px) {
        font-size: 7px;
    }
`

export const IndicatorBox = styled.div`
    width: 16px;
    height: 16px;
    cursor: pointer;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px rgb(0, 0, 0);
    pointer-events: auto;
    transition: transform 300ms, width 300ms, height 300ms;

    @media (max-width: 900px) {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 450px) {
        width: 13px;
        height: 13px;
    }
`

export const IndicatorName = styled.h1`
    font-size: 14px;
    margin-left: 8px;
    pointer-events: none;

    @media (max-width: 900px) {
        font-size: 11px;
        margin-left: 6px;
    }

    @media (max-width: 450px) {
        font-size: 8px;
        margin-left: 4px;
    }

    & span {
        opacity: 0;
    }
`

export const IndicatorHeading = styled.div`
    display: flex;
    align-items: center;
`

export const IndicatorDescription = styled.p`
    font-size: 13px;
    margin-top: 8px;
    max-width: 400px;
    pointer-events: none;

    @media (max-width: 900px) {
        margin-top: 6px;
        font-size: 10px;
    }

    @media (max-width: 450px) {
        margin-top: 4px;
        font-size: 7px;
    }

    & span {
        opacity: 0;
        font-weight: 500;
    }
`

export const Indicator = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: filter 500ms;

    &.active {
        & ${IndicatorBox} {
            width: 28px;
            height: 28px;
            transform: rotate(0);
            background-color: rgba(10, 10, 10, 0.8);
            border-width: 0px;

            @media (max-width: 900px) {
                width: 24px;
                height: 24px;
            }
        
            @media (max-width: 450px) {
                width: 16px;
                height: 16px;
            }
        }

        & ${IndicatorText} {
            opacity: 1;
            transform: rotate(0);
        }   
    }

    ${props => props.theme.dark && css`
        filter: invert(100%);
    `}
`

export const HintMessageSpan = styled(motion.span)`
    display: inline-block;
    margin: 0 2px;
`

export const HintMessage = styled(motion.h1)`
    position: absolute;
    width: 100%;
    bottom: 10%;
    font-size: 14px;
    font-weight: 500;
    color: #080808;
    text-align: center;
    transition: color 500ms;

    @media (max-width: 600px) {
        font-size: 11px;
    }

    @media (max-height: 500px) {
        font-size: 10px;
    }

    @media (max-width: 400px) {
        font-size: 9px;
    }

    ${props => props.theme.dark && css`
        color: #f8f8f8;     
    `}
`

export const WorkshopControl = styled(motion.button)`
    position: absolute;
    right: 20px;
    background: none;
    outline: none;
    border: none;
    margin-top: -45px;
    transition: filter 500ms;

    @media (max-width: 500px) {
        transform: none;
        right: auto;
        bottom: 100px;
    }

    @media (max-height: 600px) {
        margin-top: -25px;
        bottom: auto;
    }

    ${props => props.theme.dark && css`
        filter: invert(100%);
    `}
`

export const WorkshopControlCanvas = styled.canvas`

`

export const Workshop = styled.div`
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    @media (max-width: 500px) {
        justify-content: center;
    }

    @media (max-height: 600px) {
        justify-content: flex-end;
    }
`