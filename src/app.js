import React, { useEffect, useState, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import World from './experience/World.js'
import WorldContext from './contexts/WorldContext.js'
import LoadingBar from './components/LoadingBar/LoadingBar.js'
import Canvas from './components/Canvas/Canvas.js'
import Crosshair from './components/Crosshair/Crosshair.js'
import Navbar from './components/Navbar/Navbar.js'
import Slide from './components/Slide/Slide.js'
import Hero from './components/Hero/Hero.js'
import Workshop from './components/Workshop/Workshop.js'
import History from './components/History/History.js'

import './app.css'

const App = () => {
    const [dark, setDark] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const worldRef = useRef(null)
    const [worldState, setWorldState] = useState(0)

    useEffect(() => {
        const world = new World(() => setLoaded(true))
        worldRef.current = world

        const animate = () => {
            requestAnimationFrame(animate)
            world.update()
        }

        requestAnimationFrame(animate)
        addEventListener('resize', () => world.resize())
    }, [])
    
    return (
        <ThemeProvider theme={{ dark }}>
            <Canvas id='webgl-canvas' />

            { !loaded && 
                <LoadingBar id='loading-bar' />
            }

            <WorldContext.Provider value={{ world: worldRef.current, worldState, setWorldState }}>
                {loaded && <Crosshair />}

                <div id='root-inner'>
                    { loaded &&
                        <>
                            <Navbar changeTheme={() => setDark(!dark)} />
                        
                            <AnimatePresence>
                                { worldState == 0 && <Hero /> }
                            </AnimatePresence>

                            <AnimatePresence>
                                { worldState == 1 && <Workshop /> }
                            </AnimatePresence>

                            <AnimatePresence>
                                { worldState == 2 && <History /> }
                            </AnimatePresence>
                        </>
                    }
                </div>
                
                {loaded && <Slide />}
            </WorldContext.Provider>
        </ThemeProvider>
    )
}

export default App