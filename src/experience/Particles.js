import * as THREE from 'three'
import gsap from 'gsap'

import particlesVertexShader from './shaders/particles/vertex.js'
import particlesFragmentShader from './shaders/particles/fragment.js'

export class Particles {
    constructor(numPoints, world) {
        this.world = world 

        const positions = new Float32Array(numPoints * 3)

        for (let i = 0; i < numPoints; ++i) {
            positions[3 * i] = (Math.random() - 0.5) * 100.0
            positions[3 * i + 1] = (Math.random() - 0.5) * 100.0
            positions[3 * i + 2] = (Math.random() - 0.5) * 100.0
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader,
            transparent: true
        })

        this.points = new THREE.Points(geometry, material)
        this.world.scene.add(this.points)
    }

    update() {
        this.points.material.uniforms.time.value = this.world.clock.getElapsedTime()
        this.points.material.needsUpdate = true 

        this.points.rotation.x += 0.001
        this.points.rotation.y += 0.001
    }

    mouseMove(e) {
        
    }
}