import * as THREE from 'three'
import gsap from 'gsap'

import xwingVertexShader from './shaders/xwing/vertex.js'
import xwingFragmentShader from './shaders/xwing/fragment.js'

export class XwingMini {
    constructor(world, gltf) {
        this.world = world 
        this.obj = new THREE.Object3D()
        this.state = 0

        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0]

            for (const innerChild of child.children) {
                const shaderMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        center: { value: innerChild.position },
                        progress: { value: 0.0 },
                        speed: { value: 8.0 },
                        opacity: { value: 1.0 }
                    },
    
                    vertexShader: xwingVertexShader,
                    fragmentShader: xwingFragmentShader
                })
    
                innerChild.material = shaderMaterial
    
                gsap.to(innerChild.material.uniforms.progress, { value: 1, duration: 3 })
            }

            this.obj.add(child)
        }

        this.world.scene.add(this.obj)

        this.animations = {}
        this.animations[0] = gltf.animations.filter(x => x.name.startsWith('Mini body'))
        this.animations[1] = gltf.animations.filter(x => x.name.startsWith('Mini wing'))
        this.animations[2] = gltf.animations.filter(x => x.name.startsWith('Mini engine'))
        this.animations[3] = gltf.animations.filter(x => x.name.startsWith('Mini thruster'))
        this.animations[4] = gltf.animations.filter(x => x.name.startsWith('Mini gun'))
        this.animations[5] = gltf.animations.filter(x => x.name.startsWith('Wing'))
    }

    update(deltaTime) {
        if (this.state == 0) {
            this.obj.rotation.y += 0.5 * deltaTime
        }
    }

    setState(state) {
        this.state = state 

        if (this.state == 1) {
            this.obj.position.z = 200
            this.obj.scale.set(0.01, 0.01, 0.01)
        }
    }

    playClip(clip) {
        const action = this.world.animator.clipAction(clip)
        action.clampWhenFinished = true
        action.loop = THREE.LoopOnce
        action.timeScale = 2.0
        action.play()
    }
}