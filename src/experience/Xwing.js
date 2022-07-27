import * as THREE from 'three'
import gsap from 'gsap'

import xwingVertexShader from './shaders/xwing/vertex.js'
import xwingFragmentShader from './shaders/xwing/fragment.js'

export class Xwing {
    constructor(world, gltf) {
        this.state = 0
        this.world = world 
        this.obj = gltf.scene.children.find(x => x.name.startsWith('Xwing'))
        
        this.box = new THREE.Box3()
        this.box.expandByObject(this.obj)
        this.box.expandByScalar(-10.0)

        this.world.controls.fitToBox(this.box, false)
        this.box.expandByScalar(12.0)

        this.world.scene.add(this.obj)

        const xwingBounds = new THREE.Box3().setFromObject(this.obj)
        this.objLength = (xwingBounds.max.x - xwingBounds.min.x) / 2.0

        for (const child of this.obj.children) {
            const shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    center: { value: child.position },
                    progress: { value: 0.0 },
                    speed: { value: 12.0 },
                    opacity: { value: 1.0 }
                },

                vertexShader: xwingVertexShader,
                fragmentShader: xwingFragmentShader
            })

            child.material = shaderMaterial
        }

        this.spawn()
    }

    spawn() {        
        for (const child of this.obj.children) {
            gsap.killTweensOf(child.material.uniforms.progress)
            gsap.fromTo(child.material.uniforms.progress, { value: 0 }, { value: 2, duration: 3 })
        }
    }

    despawn() {
        for (const child of this.obj.children) {
            gsap.killTweensOf(child.material.uniforms.progress)
            gsap.fromTo(child.material.uniforms.progress, { value: 2 }, { value: 0, duration: 1.2 })
        }
    }

    update() {
        if (this.mouseX) {
            var x = (this.mouseX / window.innerWidth - 0.5) * 2.0
            var y = (this.mouseY / window.innerHeight - 0.5) * -2.0
            var l = this.mouseY / window.innerHeight
    
            x = Math.max(Math.min(x, 1.0), -1.0)
            y = Math.max(Math.min(y, 1.0), -1.0)
            l = Math.min(l, 1.0)
    
            if (this.world.state == 0 || this.world.state == 1) {
                for (const child of this.obj.children) {
                    if (child.name.endsWith('1') || child.name.endsWith('3')) {
                        gsap.killTweensOf(child.rotation)
                        gsap.to(child.rotation, { z: l * Math.PI / 12.0 + 0.3, duration: 0.8 })
                    }
                    
                    if (child.name.endsWith('2') || child.name.endsWith('4')) {
                        gsap.killTweensOf(child.rotation)
                        gsap.to(child.rotation, { z: -l * Math.PI / 12.0 - 0.3, duration: 0.8 })
                    }
                }
            }
        }
    }

    mouseMove(e) {
        this.mouseX = e.clientX 
        this.mouseY = e.clientY
    }

    resize() {
        if (this.world.state != 2) {
            this.world.controls.fitToBox(this.box, true)
        }
        
        this.world.controls.rotateTo(this.world.rotateA, this.world.rotateP, true)
    }

    setState(state) {
        if (this.state == 1) {
            this.box.expandByScalar(-6.0)
        }

        this.state = state 

        if (this.state == 1) {
            this.box.expandByScalar(6.0)
            gsap.to(this.obj.rotation, { y: 0, duration: 0.8 })
        }
    }
}