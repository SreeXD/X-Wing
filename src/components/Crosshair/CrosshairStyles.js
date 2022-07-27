import styled, { keyframes } from 'styled-components'

const crosshairOuterAnim = keyframes`
    33% {
        transform: rotateZ(80deg);
    }

    50% {
        transform: rotateZ(30deg);
    }

    66% {
        transform: rotateZ(-30deg);
    }

    100% {
        transform: rotateZ(0deg);
    }
`

const crosshairMiddleAnim = keyframes`
    33% {
        transform: rotateZ(-80deg);
    }

    50% {
        transform: rotateZ(30deg);
    }

    66% {
        transform: rotateZ(-60deg);
    }

    100% {
        transform: rotateZ(0deg);
    }
`


const crosshairInnerAnim = keyframes`
    33% {
        transform: rotateZ(60deg);
    }

    50% {
        transform: rotateZ(-140deg);
    }

    66% {
        transform: rotateZ(-100deg);
    }

    100% {
        transform: rotateZ(0deg);
    }
`

const crosshairInnerActiveAnim = keyframes`
    to {
        transform: rotateZ(359deg);
    }
`

const crosshairMidActiveAnim = keyframes`
    to {
        transform: rotateZ(-359deg);
    }
`

export const CrosshairParent = styled.div`
    position: absolute;
    left: calc(-12px - 1.8vw);
    top: calc(-12px - 1.8vw);
    width: calc(24px + 3.6vw);
    transform: translateX(-100%);
`

export const CrosshairParentInner = styled.div`
    transition: transform 500ms;
`

export const CrosshairInnerImg = styled.img`
    width: 100%;
    animation: ${crosshairInnerAnim} 4000ms infinite linear;
`

export const CrosshairMiddleImg = styled.img`
    width: 100%;
    animation: ${crosshairMiddleAnim} 4000ms infinite linear;
`

export const CrosshairOuterImg = styled.img`
    width: 100%;
    animation: ${crosshairOuterAnim} 4000ms infinite linear;
`

export const Crosshair = styled.div`
    position: fixed;
    filter: invert(100%);
    mix-blend-mode: difference;
    z-index: 10;
    pointer-events: none;

    & ${CrosshairParent}:nth-child(1) {
        &.active > div > img {
            animation: ${crosshairInnerActiveAnim} 2000ms infinite linear;
        }
    }

    & ${CrosshairParent}:nth-child(2) {
        &.active > div {
            transform: scale(0.6);

            & > img {
                animation: ${crosshairMidActiveAnim} 2000ms infinite linear;
            }
        }
    }

    & ${CrosshairParent}:nth-child(3) {
        &.active > div {
            transform: scale(0.55);

            & > img {
                animation: ${crosshairInnerActiveAnim} 2000ms infinite linear;
            }
        }
    }
`