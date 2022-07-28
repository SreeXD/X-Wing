import React, { useEffect, useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimationControls } from 'framer-motion'
import { Scrollbar } from 'smooth-scrollbar-react'
import gsap from 'gsap'
import * as THREE from 'three'

import WorldContext from '../../contexts/WorldContext'
import CrosshairEvents from '../Crosshair/CrosshairEvents.js'
import * as S from './HistoryStyles.js'

const animateHistorySectionTitleSpan = (x, r1, r2, delay) => ({
    initial: {
        x: x,
        opacity: 0
    },

    transition: {
        ease: [.53,0,.46,1],
        opacity: {
            duration: 0.3 + r1,
            delay: r1 + delay,
        },
        x: {
            duration: 0.3 + r2,
            delay
        }
    }
})

const animateHistorySectionParagraphSpan = (delay) => ({
    initial: {
        y: 20,
        opacity: 0
    },

    transition: {
        ease: [.53,0,.46,1],
        duration: 0.5,
        delay
    }
})

const generateHistorySectionTitleSpans = (str, delay, duration, control, displacement) => 
    str.split('').map((x, i) => {
        const r1 = (displacement / 3.0) + Math.random() * displacement
        const r2 = Math.random() * duration
        const r3 = Math.random() * duration

        return (
            <S.HistorySectionTitleSpan key={i} {...animateHistorySectionTitleSpan(r1, r2, r3, delay)} animate={control ? control : defaultTo}>
                {x}
            </S.HistorySectionTitleSpan>
        )
    })

const animateHistoryListBullet = (delay) => ({
    initial: {
        rotateZ: -45,
        scale: 0.5,
        opacity: 0
    },

    transition: {
        ease: [.53,0,.46,1],
        delay,
        duration: 0.5
    }
})

const animateHistoryListDescription = (delay) => ({
    initial: {
        opacity: 0,
        x: -10
    },

    transition: {
        ease: [.53,0,.46,1],
        delay,
        duration: 0.5
    }
})

const animateHistoryPolyButton = (delay) => ({
    initial: {
        opacity: 0
    },

    transition: {
        ease: [.53,0,.46,1],
        duration: 0.5,
        delay
    }
})

const defaultTo = {
    opacity: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    scale: 1
}

const History = (props) => {
    const { world } = useContext(WorldContext)

    const [section1Ref, section1InView] = useInView({ threshold: 0.45, triggerOnce: true })
    const [section2Ref, section2InView] = useInView({ threshold: 0.45, triggerOnce: true })
    const [section3Ref, section3InView] = useInView({ threshold: 0.45, triggerOnce: true })

    const section1Control = useAnimationControls()
    const section2Control = useAnimationControls()
    const section3Control = useAnimationControls()

    useEffect(() => {
        if (section1InView) {
            section1Control.start(defaultTo)
        }

        if (section2InView) {
            section2Control.start(defaultTo)
        }

        if (section3InView) {
            section3Control.start(defaultTo)
        }
    }, [section1InView, section2InView, section3InView])

    let hide = false

    const onScroll = (e) => {
        const historyTitles = document.querySelectorAll(S.HistoryTitle)
        const sectionNumbers = document.querySelectorAll(S.HistorySectionNumber)
        const sectionTitles = document.querySelectorAll(S.HistorySectionTitle)
        const sectionParagraphs = document.querySelectorAll(S.HistorySectionParagraph)
        const getButton = document.querySelector('#get-button')

        if (e.offset.y > 100 && !hide) {
            hide = true 
            getButton.style.right = '-150%'
        }

        if (e.offset.y < 100 && hide) {
            hide = false
            getButton.style.right = '0'
        }

        for (let i = 0; i < historyTitles.length; ++i) {
            const historyTitle = historyTitles[i]
            gsap.to(historyTitle, { y: -e.offset.y * (0.8 - i * 0.3) })
        }

        for (const sectionNumber of sectionNumbers) {
            const top = sectionNumber.getBoundingClientRect().top
            gsap.to(sectionNumber, { y: (top - window.innerHeight) * 0.13 })
        }

        for (const sectionTitle of sectionTitles) {
            const top = sectionTitle.getBoundingClientRect().top
            gsap.to(sectionTitle, { y: (top - window.innerHeight) * 0.07 })
        }

        for (const sectionParagraph of sectionParagraphs) {
            const top = sectionParagraph.getBoundingClientRect().top
            gsap.to(sectionParagraph, { y: (top - window.innerHeight) * 0.04 })
        }

        world.controls.moveTo(0, -(e.offset.y / window.innerHeight) * 60, 0, true)
    }

    useEffect(() => {
        world.updateEvents['history'] = (mouseX, mouseY, deltaTime) => {
            const sectionTitles = document.querySelectorAll(S.HistorySectionTitle)

            if (sectionTitles.length) {
                const sectionTitle2 = sectionTitles[2]
                const sectionTitle2BB = sectionTitle2.getBoundingClientRect()
                const sectionTitle4 = sectionTitles[4]
                const sectionTitle4BB = sectionTitle4.getBoundingClientRect()
             
                let x = ((sectionTitle2BB.right - 110) / window.innerWidth - 0.5) * 2.0
                let y = ((sectionTitle2BB.top - 140) / window.innerHeight - 0.5) * -2.0
                let pos = new THREE.Vector3(x, y, 0.5)
                pos.unproject(world.camera)
                world.z95.position.copy(pos)
                world.z95.rotation.y += 0.5 * deltaTime
            
                x = ((sectionTitle4BB.left + 120) / window.innerWidth - 0.5) * 2.0
                y = ((sectionTitle4BB.top - 20) / window.innerHeight - 0.5) * -2.0
                pos = new THREE.Vector3(x, y, 0.5)
                pos.unproject(world.camera)
                world.xwingMini.obj.position.copy(pos)
                world.xwingMini.obj.rotation.y += 0.5 * deltaTime
            }
        }

        return () => {
            if (hide) {
                const getButton = document.querySelector('#get-button')
                getButton.style.right = '0'
            }

            world.controls.moveTo(0, 0, 0, true)

            delete world.updateEvents['history']
        }
    }, [])
    
    return (
        <Scrollbar damping={0.08} onScroll={onScroll}>
            <S.History>
                <S.HistoryTitles>
                    <S.HistoryTitle>
                        {generateHistorySectionTitleSpans('X-WING', 1, 0.55, null, -15)}
                    </S.HistoryTitle>

                    <S.HistoryTitle>
                        {generateHistorySectionTitleSpans('HISTORY', 1, 0.55, null, -35)}
                    </S.HistoryTitle>
                </S.HistoryTitles>

                <S.HistorySection ref={section1Ref}>
                    <S.HistorySectionNumber>
                        {generateHistorySectionTitleSpans('01', 0, 0.3, section1Control, -15)}
                    </S.HistorySectionNumber>

                    <S.HistorySectionTitle>
                        {generateHistorySectionTitleSpans('IT ALL', 0.15, 0.5, section1Control, -15)}
                    </S.HistorySectionTitle>
                    
                    <S.HistorySectionTitle>
                        {generateHistorySectionTitleSpans('STARTED WITH', 0.15, 0.5, section1Control, -15)}
                    </S.HistorySectionTitle>
                    
                    <S.HistorySectionParagraph>
                        <S.HistorySectionParagraphSpan {...animateHistorySectionParagraphSpan(0.5)} animate={section1Control}>
                            The Galactic Empire commissioning us to create a starfighter that could finally turn the tides in the war against The Republic
                        </S.HistorySectionParagraphSpan>
                    </S.HistorySectionParagraph>
                    
                    <S.HistorySectionParagraph>
                        <S.HistorySectionParagraphSpan {...animateHistorySectionParagraphSpan(0.6)} animate={section1Control}>
                            Our engineers worked day and night to come up with the best design for a starfighter that could excel every existing starfighter in both flight and combat ability
                        </S.HistorySectionParagraphSpan>
                    </S.HistorySectionParagraph>
                </S.HistorySection>

                <S.HistorySection ref={section2Ref}>
                    <S.HistorySectionNumber>
                        {generateHistorySectionTitleSpans('02', 0, 0.3, section2Control, 15)}
                    </S.HistorySectionNumber>

                    <S.HistorySectionTitle>
                        {generateHistorySectionTitleSpans('IN COMES', 0.15, 0.5, section2Control, 15)}
                    </S.HistorySectionTitle>
                    
                    <S.HistorySectionTitle>
                        {generateHistorySectionTitleSpans('Z-95', 0.15, 0.5, section2Control, 15)}
                    </S.HistorySectionTitle>

                    <S.HistorySectionParagraph>
                        <S.HistorySectionParagraphSpan {...animateHistorySectionParagraphSpan(0.5)} animate={section2Control}>
                            Our solution to the empire's problem, The z-95 headhunter was capable of outmaneuvering every other starfighter at the time and was known to be the most versatile snub-fighter of its era
                        </S.HistorySectionParagraphSpan>
                    </S.HistorySectionParagraph>

                    <S.HistoryPolyButtonParent>    
                        <S.HistoryPolyButton href='#' {...animateHistoryPolyButton(0.7)} animate={section2Control} {...CrosshairEvents}>
                            {generateHistorySectionTitleSpans('LEARN MORE', 0.7, 0.3, section2Control, 10)}
                        </S.HistoryPolyButton>
                    </S.HistoryPolyButtonParent>
                </S.HistorySection>

                <S.HistorySection ref={section3Ref}>
                    <S.HistorySectionNumber>
                        {generateHistorySectionTitleSpans('03', 0, 0.3, section3Control, -15)}
                    </S.HistorySectionNumber>

                    <S.HistorySectionTitle>
                        {generateHistorySectionTitleSpans('THE', 0.15, 0.5, section3Control, -15)}
                    </S.HistorySectionTitle>
                    
                    <S.HistorySectionTitle>
                        {generateHistorySectionTitleSpans('IMPROVEMENT', 0.15, 0.5, section3Control, -15)}
                    </S.HistorySectionTitle>

                    <S.HistorySectionParagraph>
                        <S.HistorySectionParagraphSpan {...animateHistorySectionParagraphSpan(0.5)} animate={section3Control}>
                            Developed by the best aeronautical engineers of the galaxy, X-Wing T-65 is designed to dominate starfighting by a large margin.. more so than the Z-95 Headhunter. Over it's predecessor, the X-Wing T65 model boasts the following 
                        </S.HistorySectionParagraphSpan>
                    </S.HistorySectionParagraph>


                    <S.HistoryList>
                        <S.HistoryListItem>
                            <S.HistoryListItemBullet>
                                <S.HistoryListItemBulletSpan {...animateHistoryListBullet(0.7)} animate={section3Control}>
                                    1
                                </S.HistoryListItemBulletSpan>
                            </S.HistoryListItemBullet>

                            <S.HistoryListItemDescription>
                                <S.HistoryListItemDescriptionSpan {...animateHistoryListDescription(0.8)} animate={section3Control}>
                                    Improved shielding 
                                </S.HistoryListItemDescriptionSpan>
                            </S.HistoryListItemDescription>
                        </S.HistoryListItem>

                        <S.HistoryListItem>
                            <S.HistoryListItemBullet>
                                <S.HistoryListItemBulletSpan {...animateHistoryListBullet(0.8)} animate={section3Control}>
                                    2
                                </S.HistoryListItemBulletSpan>
                            </S.HistoryListItemBullet>

                            <S.HistoryListItemDescription>
                                <S.HistoryListItemDescriptionSpan {...animateHistoryListDescription(0.9)} animate={section3Control}>
                                    Improved sensor packages
                                </S.HistoryListItemDescriptionSpan>
                            </S.HistoryListItemDescription>
                        </S.HistoryListItem>

                        <S.HistoryListItem>
                            <S.HistoryListItemBullet>
                                <S.HistoryListItemBulletSpan {...animateHistoryListBullet(0.9)} animate={section3Control}>
                                    3
                                </S.HistoryListItemBulletSpan>
                            </S.HistoryListItemBullet>

                            <S.HistoryListItemDescription>
                                <S.HistoryListItemDescriptionSpan {...animateHistoryListDescription(1.0)} animate={section3Control}>
                                    Improved atmospheric flight
                                </S.HistoryListItemDescriptionSpan>
                            </S.HistoryListItemDescription>
                        </S.HistoryListItem>
                    </S.HistoryList>

                    <S.HistoryPolyButtonParent>    
                        <S.HistoryPolyButton href='#' {...animateHistoryPolyButton(1.1)} animate={section3Control} {...CrosshairEvents}>
                            {generateHistorySectionTitleSpans('LEARN MORE', 1.1, 0.3, section3Control, -10)}
                        </S.HistoryPolyButton>
                    </S.HistoryPolyButtonParent>
                </S.HistorySection>
            </S.History>
        </Scrollbar>
    )
}

export default History