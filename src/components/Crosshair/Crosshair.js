import React, { useEffect, useContext } from 'react'
import gsap from 'gsap'

import WorldContext from '../../contexts/WorldContext.js'
import * as S from './CrosshairStyles.js'

import crosshairInner from '../../assets/crosshair-inner.png'
import crosshairMiddle from '../../assets/crosshair-middle.png'
import crosshairOuter from '../../assets/crosshair-outer.png'

const Crosshair = () => {
    const { world } = useContext(WorldContext)

    useEffect(() => {
        const tweens = [null, null, null]

        world.events['crosshair'] = ((mouseX, mouseY) => {
            let duration = 0
            let j = 0
            for (const child of [ '#crosshair-inner', '#crosshair-mid', '#crosshair-outer' ]) {                
                if (tweens[j]) {
                    tweens[j].kill()
                }

                const childNode = document.querySelector(child)
                tweens[j++] = gsap.to(childNode, { x: mouseX, y: mouseY, duration })

                if (childNode.classList.contains('active')) {
                    duration += 0.075
                }

                else duration += 0.15
            }   
        })

        return () => {
            delete world.events['crosshair']
        }
    }, [])

    return (
        <S.Crosshair>
            <S.CrosshairParent id='crosshair-inner'>
                <S.CrosshairParentInner>
                    <S.CrosshairInnerImg src={crosshairInner} />
                </S.CrosshairParentInner>
            </S.CrosshairParent>

            <S.CrosshairParent id='crosshair-mid'>
                <S.CrosshairParentInner>
                    <S.CrosshairMiddleImg src={crosshairMiddle} />
                </S.CrosshairParentInner>
            </S.CrosshairParent>

            <S.CrosshairParent id='crosshair-outer'>
                <S.CrosshairParentInner>
                    <S.CrosshairOuterImg src={crosshairOuter} />
                </S.CrosshairParentInner>
            </S.CrosshairParent>
        </S.Crosshair>    
    )
}

export default Crosshair