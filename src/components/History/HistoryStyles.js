import styled, { css } from 'styled-components'

import { motion } from 'framer-motion'

export const HistoryTitles = styled.div`
    margin-top: 32vh;

    @media (max-width: 800px) {
        margin-top: 40vh;
    }

    @media (max-width: 500px) {

    }
`

export const HistoryTitle = styled.h1`
    text-align: center;
    font-weight: 400;
    transition: color 500ms, background-color 500ms;

    &:nth-child(1) {
        font-size: 4rem;
        color: #202020;

        @media (max-width: 800px) {
            font-size: 3rem;
        }

        @media (max-width: 500px) {
            font-size: 2rem;
        }

        @media (max-width: 350px) {
            font-size: 1.6rem;
        }
    }

    &:nth-child(2) {
        font-size: 9rem;
        color: #a8a8a8;

        @media (max-width: 800px) {
            font-size: 5.5rem;
        }

        @media (max-width: 500px) {
            font-size: 4rem;
        }

        @media (max-width: 350px) {
            font-size: 3rem;
        }
    }

    ${props => props.theme.dark && css`
        &:nth-child(1) {
            color: #7f7f7f;
        }

        &:nth-child(2) {
            color: #e0e0e0;
        }
    `}
`

export const HistoryPolyButtonParent = styled.div`
    margin-top: 60px;
`

export const HistoryPolyButton = styled(motion.a)`
    text-decoration: none;
    font-size: 1rem;
    padding: 16px 40px;
    background-color: #202020;
    color: #e0e0e0;
    transition: background-color 300ms, color 500ms;

    @media (max-width: 800px) {
        font-size: 0.8rem;   
    }

    @media (max-width: 500px) {
        font-size: 0.65rem;
    }

    @media (max-width: 350px) {
        font-size: 0.6rem;
    }

    &:hover {
        background-color: #e8e8e8;
        color: #202020;
    }

    ${props => props.theme.dark && css`
        color: #202020;
        background-color: #e0e0e0;

        &:hover {
            color: #e8e8e8;
            background-color: #202020;
        }
    `}
`

export const HistoryListItemBulletSpan = styled(motion.span)`
    width: 2rem;
    height: 2rem;
    background-color: #202020;
    color: #e0e0e0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 500ms, background-color 500ms;

    @media (max-width: 800px) {
        width: 1.6rem;
        height: 1.6rem;
        font-size: 0.7rem;   
    }

    @media (max-width: 500px) {
        font-size: 0.6rem;   
    }

    @media (max-width: 350px) {
        font-size: 0.5rem;
    }

    ${props => props.theme.dark && css`
        color: #202020;
        background-color: #e0e0e0;
    `}
`

export const HistoryListItemBullet = styled.div`

`

export const HistoryListItemDescriptionSpan = styled(motion.span)`
    display: inline-block;
`

export const HistoryListItemDescription = styled.p`
    color: #1f1f1f;
    font-size: 1.1rem;
    margin-left: 14px;
    transition: color 500ms, background-color 500ms;

    @media (max-width: 800px) {
        font-size: 0.85rem;   
    }

    @media (max-width: 500px) {
        font-size: 0.75rem;     
    }

    @media (max-width: 350px) {
        font-size: 0.7rem;
    }

    ${props => props.theme.dark && css`
        color: #e0e0e0;
    `}
`

export const HistoryListItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`

export const HistoryList = styled.ul`
    list-style: none;
    margin-top: 24px;
    margin-bottom: 80px;
`

export const HistorySectionParagraphSpan = styled(motion.span)`
    display: inline-block;
`

export const HistorySectionParagraph = styled.p`
    color: #202020;
    font-size: 1.1rem;
    margin-top: 32px;
    line-height: 180%;
    width: 80vw;
    transition: color 500ms, background-color 500ms;

    @media (max-width: 800px) {
        font-size: 0.85rem;   
    }

    @media (max-width: 500px) {
        font-size: 0.75rem;
        line-height: 150%; 
        width: 85vw;  
    }

    @media (max-width: 350px) {
        font-size: 0.7rem;
    }

    ${props => props.theme.dark && css`
        color: #e0e0e0;
    `}
`

export const HistorySectionTitleSpan = styled(motion.span)`
    display: inline-block;
    white-space: pre;
`

export const HistorySectionTitle = styled.h1`
    color: #202020;
    font-size: 3.6rem;
    font-weight: 400;
    transition: color 500ms, background-color 500ms;

    @media (max-width: 800px) {
        font-size: 2.7rem;   
    }

    @media (max-width: 500px) {
        font-size: 2rem;   
    }

    @media (max-width: 350px) {
        font-size: 1.6rem;
    }

    ${props => props.theme.dark && css`
        color: #e0e0e0;
    `}
`

export const HistorySectionNumber = styled.h1`
    color: #8f8f8f;
    font-size: 1.05rem;
    font-weight: 400;

    @media (max-width: 800px) {
        font-size: 0.95rem;   
    }

    @media (max-width: 500px) {
        font-size: 0.75rem;   
    }

    @media (max-width: 350px) {
        font-size: 0.65rem;
    }
`

export const HistorySection = styled.div`
    margin: 60vh 30px;

    &:nth-child(3) {
        display: flex;
        flex-direction: column;
        align-items: end;
        text-align: right;
    }
`

export const History = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
`