import React, { useContext, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

import CrosshairEvents from '../Crosshair/CrosshairEvents.js'
import WorldContext from '../../contexts/WorldContext.js'
import * as S from './WorkshopStyles.js'

import tone2 from '../../assets/tone2.wav'
import tone9 from '../../assets/tone9.wav'
import xwingParts from './xwingParts.json'

const hintMessageVariants = {
    hidden: {

    },

    visible: {
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.3
        }
    },

    exit: {
        transition: {
            staggerChildren: 0.03
        }
    }
}

const hintMessageSpanVariants = {
    hidden: {
        opacity: 0
    },

    visible: {
        opacity: 1.0,
        transition: {
            ease: [.58,.43,.55,.98],
            duration: 0.7
        }
    },

    exit: {
        opacity: 0.0,
        transition: {
            ease: [.58,.43,.55,.98],
            duration: 0.5
        }
    }
}

export const Workshop = (props) => {
    const { world } = useContext(WorldContext)

    const children = world.xwing.obj.children.filter(x => x.name in xwingParts)

    const getCenter = (mesh) => {
        mesh.geometry.computeBoundingBox()

        const center = new THREE.Vector3()
        center.x = (mesh.geometry.boundingBox.max.x + mesh.geometry.boundingBox.min.x) * 0.5
        center.y = (mesh.geometry.boundingBox.max.y + mesh.geometry.boundingBox.min.y) * 0.5
        center.z = (mesh.geometry.boundingBox.max.z + mesh.geometry.boundingBox.min.z) * 0.5
        mesh.localToWorld(center)
        
        return center 
    }

    let i = 0
    const indicators = []

    for (const child of children) {
        const indicator =  (
            <S.Indicator key={child.name} id={`indicator-${child.name}`} initial={{ opacity: 0 }} animate={{ opacity: 1, duration: 0.3 }} exit={{ opacity: 0, transition: { delay: 0 } }} transition={{ delay: 0.5 }}>
                <S.IndicatorHeading>
                    <S.IndicatorBox className='indicator-box' {...CrosshairEvents}>
                        <S.IndicatorText>0{++i}</S.IndicatorText>
                    </S.IndicatorBox>

                    <S.IndicatorName className='indicator-name'></S.IndicatorName>
                </S.IndicatorHeading>

                <S.IndicatorDescription className='indicator-description'></S.IndicatorDescription> 
            </S.Indicator>
        )

        indicators.push(indicator)
    }

    useEffect(() => {
        var tweens = {}

        for (const child of children) {
            const parNode = document.querySelector(`#indicator-${child.name}`)
            const childNode =  parNode.querySelector('.indicator-box')

            childNode.addEventListener('mouseenter', e => {
                parNode.classList.add('active')

                const indicatorName = parNode.querySelector('.indicator-name')
                const indicatorDescription = parNode.querySelector('.indicator-description')

                if (indicatorName.children.length == 0) {
                    for (const c of xwingParts[child.name].name) {
                        const span = document.createElement('span')
                        span.classList.add('character')
                        span.innerHTML = c

                        indicatorName.appendChild(span)
                    }
                }

                if (indicatorDescription.children.length == 0) {
                    for (const c of xwingParts[child.name].description) {
                        const span = document.createElement('span')
                        span.classList.add('character')
                        span.innerHTML = c

                        indicatorDescription.appendChild(span)
                    }
                }

                const descriptionChars = [...parNode.querySelectorAll('.character')].filter(x => x.style.opacity < 1)
                
                if (tweens[child.name]) {
                    tweens[child.name].kill()
                }

                tweens[child.name] = gsap.to(descriptionChars, { opacity: 1, duration: 0.25, stagger: 0.02, delay: 0.3 })

                for (const other of world.xwing.obj.children.filter(x => !x.name.startsWith(child.name.substr(0, child.name.length - 3)))) {
                    gsap.to(other.material.uniforms.opacity, { value: 0.3 })
                }

                for (const other of document.querySelectorAll('.indicator-box')) {
                    if (other != parNode.firstChild.firstChild) {
                        gsap.to(other, { opacity: 0.4 })
                    }
                }

                const audio = new Audio()
                audio.volume = 0.15
                audio.src = tone2
                audio.play()
            })

            childNode.addEventListener('mouseleave', e => {
                parNode.classList.remove('active')
                const descriptionChars = [...parNode.querySelectorAll('.character')].filter(x => x.style.opacity > 0)

                if (tweens[child.name]) {
                    tweens[child.name].kill()
                }

                tweens[child.name] = gsap.to(descriptionChars, { opacity: 0, duration: 0.15, stagger: { from: 'end', each: 0.008 }})
            
                for (const other of world.xwing.obj.children.filter(x => x != child)) {
                    gsap.to(other.material.uniforms.opacity, { value: 1.0 })
                }

                for (const other of document.querySelectorAll('.indicator-box')) {
                    if (other != parNode.firstChild.firstChild) {
                        gsap.to(other, { opacity: 1.0 })
                    }
                }
            })
        }

        world.updateEvents['workshop'] = (mouseX, mouseY) => {
            for (const child of children) {
                const parNode = document.querySelector(`#indicator-${child.name}`)

                if (parNode) {
                    let pos = getCenter(child)
                    pos = pos.project(world.camera)
        
                    const x = (pos.x * 0.5 + 0.5) * window.innerWidth  
                    const y = (-pos.y * 0.5 + 0.5) * window.innerHeight 
    
                    gsap.to(parNode.style, { left: x + 'px' })
                    gsap.to(parNode.style, { top: y + 'px' })
                }
            }
        }

        const controlCanvases = document.querySelectorAll('.control-canvas')

        const drawControlOuter = (ctx, params) => {
            for (let i = 0; i < 4; ++i) {
                ctx.beginPath()
                ctx.lineWidth = params.outerStroke
                ctx.strokeStyle = params['outerStrokeColor' + i]
                const offset = i * Math.PI * 0.5 + params.initialOffset
                ctx.arc(params.outerX, params.outerY, params.outerRadius, -params.segmentLength / 2 + offset, params.segmentLength / 2 + offset)
                ctx.stroke()
                ctx.closePath()
            }
        }

        const drawControlInner = (ctx, params) => {            
            ctx.beginPath()
            ctx.lineWidth = params.innerStroke
            ctx.strokeStyle = params.innerStrokeColor 
            ctx.arc(params.innerX, params.innerY, params.innerRadius, 0, Math.PI * 2.0)
            ctx.stroke()
            ctx.closePath()
        }

        for (const canvas of controlCanvases) {
            const ctx = canvas.getContext('2d')
            const canvasBB = canvas.getBoundingClientRect() 
            ctx.clearRect(0, 0, canvasBB.width, canvasBB.height)

            const moveTween = null

            const params = { 
                innerX: canvasBB.width * 0.5,
                innerY: canvasBB.height * 0.5,
                outerX: canvasBB.width * 0.5,
                outerY: canvasBB.height * 0.5,
                outerRadius: 4.0,
                innerRadius: 30.0,
                segmentLength: Math.PI / 8.0,
                initialOffset: 0.0,
                outerStroke: 2,
                innerStroke: 1,
                innerStrokeColor: '#000000',
                outerStrokeColor0: '#000000',
                outerStrokeColor1: '#000000',
                outerStrokeColor2: '#000000',
                outerStrokeColor3: '#000000',
                highlight: -1,
                dragging: false 
            }

            const pointerEnter = (e) => {
                e.preventDefault()

                CrosshairEvents.onMouseEnter()
                const canvasBB = canvas.getBoundingClientRect() 

                const audio = new Audio()
                audio.volume = 0.1
                audio.src = tone9
                audio.play()

                gsap.to(params, { 
                    outerRadius: 60,
                    segmentLength: Math.PI / 3.0,
                    initialOffset: Math.PI,
                    innerRadius: 6,
                    outerStroke: 2  ,
                    innerStroke: 1,
                    innerStrokeColor: '#000000',
                    outerStrokeColor0: '#9f9f9f',
                    outerStrokeColor1: '#9f9f9f',
                    outerStrokeColor2: '#9f9f9f',
                    outerStrokeColor3: '#9f9f9f',
                    onUpdate: () => {
                        ctx.clearRect(0, 0, canvasBB.width, canvasBB.height)
                        
                        drawControlInner(ctx, params)         
                        drawControlOuter(ctx, params)
                    },
                    duration: 0.4,
                    ease: 'power2',
                })
            }

            const pointerDown = (e) => {
                e.preventDefault()

                params.dragging = true

                gsap.to(params, { 
                    innerStroke: 2,
                    onUpdate: () => {
                        ctx.clearRect(0, 0, canvasBB.width, canvasBB.height)
                        
                        drawControlInner(ctx, params)         
                        drawControlOuter(ctx, params)
                    },
                    duration: 0.4,
                    ease: 'power2'
                })
            }

            const pointerUp = (e) => {
                e.preventDefault()

                params.dragging = false

                const canvasBB = canvas.getBoundingClientRect() 

                if (moveTween) {
                    moveTween.kill()
                }

                if (params.highlight == 0) {
                    world.rotateA -= Math.PI / 8.0
                    world.controls.rotateTo(world.rotateA, world.rotateP, true)
                }

                if (params.highlight == 1) {
                    world.rotateP -= Math.PI / 8.0
                    world.controls.rotateTo(world.rotateA, world.rotateP, true)
                }

                if (params.highlight == 2) {
                    world.rotateA += Math.PI / 8.0
                    world.controls.rotateTo(world.rotateA, world.rotateP, true)
                }

                if (params.highlight == 3) {
                    world.rotateP += Math.PI / 8.0
                    world.controls.rotateTo(world.rotateA, world.rotateP, true)
                }

                params.highlight = -1

                gsap.to(params, { 
                    innerX: canvasBB.width * 0.5,
                    innerY: canvasBB.height * 0.5,
                    outerStrokeColor0: '#9f9f9f',
                    outerStrokeColor1: '#9f9f9f',
                    outerStrokeColor2: '#9f9f9f',
                    outerStrokeColor3: '#9f9f9f',
                    innerStroke: 1,
                    onUpdate: () => {
                        ctx.clearRect(0, 0, canvasBB.width, canvasBB.height)
                        
                        drawControlInner(ctx, params)         
                        drawControlOuter(ctx, params)
                    },
                    duration: 0.4,
                    ease: 'power2'
                })
            }

            const pointerMove = (e) => {
                e.preventDefault()

                if (params.dragging) {
                    const canvasBB = canvas.getBoundingClientRect() 

                    const x = e.clientX - canvasBB.left 
                    const y = e.clientY - canvasBB.top

                    const rx = x - canvasBB.width * 0.5
                    const ry = y - canvasBB.height * 0.5

                    let highlight = -1

                    if (Math.abs(rx) > Math.abs(ry)) {
                        if (rx < -20) {
                            highlight = 0
                        }

                        if (rx > 20) {
                            highlight = 2
                        }
                    }

                    else {
                        if (ry < -20) {
                            highlight = 1 
                        }

                        if (ry > 20) {
                            highlight = 3
                        }
                    }

                    params.highlight = highlight 

                    moveTween = gsap.to(params, {
                        innerX: Math.min(canvasBB.width * 0.5 + 30, Math.max(canvasBB.width * 0.5 - 30, x)),
                        innerY: Math.min(canvasBB.height * 0.5 + 30, Math.max(canvasBB.height * 0.5 - 30, y)),
                        outerStrokeColor0: (highlight == 0 ? '#000000' : '#9f9f9f'),
                        outerStrokeColor1: (highlight == 1 ? '#000000' : '#9f9f9f'),
                        outerStrokeColor2: (highlight == 2 ? '#000000' : '#9f9f9f'),
                        outerStrokeColor3: (highlight == 3 ? '#000000' : '#9f9f9f'),

                        onUpdate: () => {
                            ctx.clearRect(0, 0, canvasBB.width, canvasBB.height)

                            drawControlInner(ctx, params)   
                            drawControlOuter(ctx, params)
                        },

                        ease: 'power2',
                        duration: 0.4
                    })
                }
            }

            const pointerLeave = (e, isTouch) => {
                if (!isTouch) {
                    e.preventDefault()
                }

                CrosshairEvents.onMouseLeave()
                const canvasBB = canvas.getBoundingClientRect() 

                params.dragging = false 
                params.highlight = -1

                if (moveTween) {
                    moveTween.kill()
                }

                gsap.to(params, { 
                    innerX: canvasBB.width * 0.5,
                    innerY: canvasBB.height * 0.5,
                    outerRadius: 4.0,
                    segmentLength: Math.PI / 8.0,
                    initialOffset: 0,
                    innerRadius: 30.0,
                    outerStroke: 2,
                    innerStroke: 1,
                    innerStrokeColor: '#000000',
                    outerStrokeColor0: '#000000',
                    outerStrokeColor1: '#000000',
                    outerStrokeColor2: '#000000',
                    outerStrokeColor3: '#000000',
                    onUpdate: () => {
                        ctx.clearRect(0, 0, canvasBB.width, canvasBB.height)
                        drawControlInner(ctx, params)         
                        drawControlOuter(ctx, params)
                    },
                    duration: 0.4,
                    ease: 'power2',
                })
            }

            canvas.addEventListener('mouseenter', pointerEnter)
            canvas.addEventListener('mousedown', pointerDown)

            canvas.addEventListener('touchstart', e => {
                pointerEnter(e)
                pointerDown(e)
            })

            canvas.addEventListener('mousemove', pointerMove)

            canvas.addEventListener('touchmove', e => {
                e.clientX = e.touches[0].clientX
                e.clientY = e.touches[0].clientY
                pointerMove(e)
            })

            canvas.addEventListener('mouseleave', pointerLeave)
            canvas.addEventListener('mouseup', pointerUp) 
            canvas.addEventListener('touchend', pointerUp)

            const touchEnd = (e) => {
                if (!canvas.contains(e.target)) {
                    pointerLeave(e, true)
                }
            }

            document.querySelector('#workshop').addEventListener('touchstart', touchEnd)

            drawControlInner(ctx, params)         
            drawControlOuter(ctx, params)
        }

        world.events['workshop'] = (mouseX, mouseY) => {
            const workshopControl = document.querySelector('#workshop-control')

            const x = (mouseX / window.innerWidth - 0.5) * 2.0
            const y = (mouseY / window.innerHeight - 0.5) * -2.0

            gsap.to(workshopControl, { x: 5.0 * x, y: 5.0 * y })
        }

        return () => {
            delete world.events['workshop']
            delete world.updateEvents['workshop']
        }
    }, [])

    return (
        <S.Workshop id='workshop'>
            <S.WorkshopControl id='workshop-control' initial={{ opacity: 0 }} animate={{ opacity: 1, duration: 1.0 }} exit={{ opacity: 0 }}>
                <S.WorkshopControlCanvas className='control-canvas' height={160} width={160}/>
            </S.WorkshopControl>
            
            {indicators}

            <S.HintMessage variants={hintMessageVariants} initial='hidden' animate='visible' exit='exit'>
                {'Hover over each component to know more about it'.split(' ').map((x, i) => (
                    <S.HintMessageSpan key={i} variants={hintMessageSpanVariants}>
                        {x}
                    </S.HintMessageSpan>
                ))}
            </S.HintMessage>
        </S.Workshop>
    )
}

export default Workshop