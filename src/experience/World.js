import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import CameraControls from 'camera-controls'

import { XwingMini } from './XwingMini.js'
import { Xwing } from './Xwing.js'
import Bg from './Bg.js'

import xwingMiniGLB from '../assets/xwingmini.glb'
import xwingGLB from '../assets/scene.glb'

export default class World {
    constructor(onload) {
        this.state = 0
        this.onload = onload
        this.loadingBar = document.querySelector('#loading-bar')

        const canvas = document.getElementById('webgl-canvas')

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(2, devicePixelRatio))
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.setClearColor(0xf8f8f8)
        this.renderer.physicallyCorrectLights = true

        this.scene = new THREE.Scene()
        this.animator = new THREE.AnimationMixer(this.scene)
        
        this.events = {}
        this.updateEvents = {}

        this.load()

        this.clock = new THREE.Clock()
        this.clock.start()

        this.currentH = 0
        this.currentV = 0
    }

    load() {
        const gltfLoader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()

        dracoLoader.setDecoderPath('./libs/draco/')
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(xwingMiniGLB, gltf => {
            this.xwingMini = new XwingMini(this, gltf)
            this.camera = gltf.cameras[0]
            this.scene.attach(this.camera)
            
            this.resize()

            gltfLoader.load(xwingGLB, 
                gltf => {
                    this.xwingMini.setState(1)

                    this.camera = gltf.cameras[0]                    
                    this.scene.attach(this.camera)

                    CameraControls.install({ THREE })

                    this.controls = new CameraControls(this.camera, document.querySelector('#root-inner'))
                    this.controls.enabled = false

                    this.rotateA = 0
                    this.rotateP = Math.PI / 2.0

                    this.bg = new Bg(this, gltf)
                    this.xwing = new Xwing(this, gltf) 

                    this.z95 = gltf.scene.children.find(x => x.name == 'z95')
                    this.z95.scale.set(0.006, 0.006, 0.006)
                    this.z95.rotation.x += 0.5

                    this.scene.add(this.z95)

                    this.resize()
                    this.onload()
                    this.loaded = true

                    window.addEventListener('mousemove', e => this.mouseMove(e))
                },

                e => {
                    const total = 3000000
                    const perc = e.loaded / total

                    this.loadingBar.style.width = (perc * 100).toString() + 'vw'
                    
                    for (let i = 0; i < perc * 6; ++i) {
                        for (const clip of this.xwingMini.animations[i]) {
                            this.xwingMini.playClip(clip)
                        }
                    }
                }
            )
        })
    }

    update() {      
        const deltaTime = this.clock.getDelta()

        if (this.controls) {
            this.controls.rotateTo(this.rotateA + this.currentH, this.rotateP + this.currentV, true)
            this.controls.update(deltaTime)
        }

        if (this.xwingMini) {
            this.xwingMini.update(deltaTime)
        }
        
        if (this.xwing) {
            this.xwing.update()
        }

        if (this.animator) {
            this.animator.update(deltaTime)
        }
    
        if (this.bg) {
            this.bg.update(deltaTime)
        }

        if (this.loaded) {            
            for (const event of Object.values(this.updateEvents)) {
                event(this.mouseX, this.mouseY, deltaTime)
            }
        }

        if (this.camera) {
            this.renderer.render(this.scene, this.camera)
        }
    }

    mouseMove(e) {
        e.preventDefault()

        this.mouseX = e.clientX 
        this.mouseY = e.clientY

        if (this.xwing) {
            this.xwing.mouseMove(e)
        }

        if (this.controls) {
            const x1 = (this.state == 2 ? 0.035 : 0.15)
            const x2 = (this.state == 2 ? 0.02 : 0.08)
            this.currentH = (this.mouseX / window.innerWidth - 0.5) * x1
            this.currentV = (this.mouseY / window.innerHeight - 0.5) * x2
        }

        if (this.loaded) {
            for (const event of Object.values(this.events)) {
                event(this.mouseX, this.mouseY)
            }
        }
    }

    resize() {
        if (this.camera) {
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
        }

        if (this.xwing) {
            this.xwing.resize()
        }
    }

    setState(state) {
        if (this.state == 2) {
            this.bg.unfade()
            this.xwing.spawn()
        }

        this.state = state

        const x1 = (this.state == 2 ? 0.035 : 0.2)
        const x2 = (this.state == 2 ? 0.025 : 0.15)
        this.currentH = (this.mouseX / window.innerWidth - 0.5) * x1
        this.currentV = (this.mouseY / window.innerHeight - 0.5) * x2

        if (this.state == 0) {
            this.rotateP = Math.PI / 2.0
        }

        if (this.state == 1) {
            this.rotateP = Math.PI / 2.5
        }
        
        if (this.state == 2) {
            this.rotateP = Math.PI / 2.0
            this.xwing.despawn()
            this.bg.fade()
        }
    
        this.xwing.setState(state)
        this.rotateA = 0
        this.resize()
    }
}