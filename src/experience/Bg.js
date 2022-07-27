import * as THREE from 'three'
import gsap from 'gsap'

import bgVertexShader from './shaders/bg/vertex.js'
import bgFragmentShader from './shaders/bg/fragment.js'

class Bg {
    constructor(world, gltf) {
        this.world = world
        this.asteroids = new THREE.Object3D()
        
        this.deathStar = gltf.scene.children.find(x => x.name.startsWith('Death'))
        this.asteroids = gltf.scene.children.filter(x => x.name.startsWith('Asteroid'))

        this.deathStarMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: 0.97 },
                center: { value: this.deathStar.position }
            },
            vertexShader: bgVertexShader,
            fragmentShader: bgFragmentShader
        })

        this.deathStar.material = this.deathStarMaterial
        this.deathStar.scale.set(0.8, 0.8, 0.8)

        this.world.scene.add(this.deathStar)

        this.asteroidMaterial = this.deathStarMaterial.clone()
        this.asteroidMaterial.uniforms.color.value = 1.0
        
        this.generateAsteroidFarm(150, 2000, 3, 350)

        gsap.to(this.deathStarMaterial.uniforms.color, { value: 0.85, duration: 2, delay: 1.0 })
        gsap.to(this.asteroidMaterial.uniforms.color, { value: 0.15, duration: 2.5, delay: 0.5 })
    }

    fade() {
        gsap.killTweensOf(this.deathStarMaterial.uniforms.color)

        gsap.to(this.deathStarMaterial.uniforms.color, { value: 0.93, duration: 1.5 })
        gsap.to(this.asteroidMaterial.uniforms.color, { value: 0.6, duration: 2 })
    }

    unfade() {
        gsap.killTweensOf(this.deathStarMaterial.uniforms.color)

        gsap.to(this.deathStarMaterial.uniforms.color, { value: 0.85, duration: 2 })
        gsap.to(this.asteroidMaterial.uniforms.color, { value: 0.15, duration: 2.5 })
    }

    generateAsteroidFarm(numAsteroids, radius, scale, yDisplacement) {
        this.deathStar.geometry.computeBoundingBox()
        let deathStarBB = this.deathStar.geometry.boundingBox
        let deathStarBBmin = this.deathStar.localToWorld(deathStarBB.min)
        let deathStarBBmax = this.deathStar.localToWorld(deathStarBB.max)
        let minRadius = (deathStarBBmax.x - deathStarBBmin.x) / 2.0
        this.asteroidFarm = new THREE.Group()

        for (let i = 0; i < numAsteroids; ++i) {
            let theta = Math.random() * 2.0 * Math.PI
            let r = Math.random() * radius
            r = Math.max(r, minRadius) 
            let s = Math.random() * scale
            let x = r * Math.sin(theta)
            let y = 2.0 * (Math.random() - 0.5) * yDisplacement
            let z = r * Math.cos(theta)
            let rx = Math.random() * 2.0 * Math.PI
            let ry = Math.random() * 2.0 * Math.PI

            let ind = i % 3 
            let asteroid = this.asteroids[ind].clone()
            asteroid.position.set(x, y, z)
            asteroid.scale.set(s, s, s)
            asteroid.rotation.set(rx, ry, 0)
            asteroid.material = this.asteroidMaterial

            this.asteroidFarm.add(asteroid)
        }

        this.asteroidFarm.position.copy(this.deathStar.position)
        this.world.scene.add(this.asteroidFarm)
    }

    update(deltaTime) {
        this.deathStar.rotation.y += 0.005 * deltaTime
        this.deathStar.position.x += deltaTime * 1.5

        this.asteroidFarm.rotation.y += 0.01 * deltaTime
        this.asteroidFarm.position.x += deltaTime * 1.5

        for (const asteroid of this.asteroidFarm.children) {
            asteroid.rotation.z += Math.random() * deltaTime
        }
    }    
}

export default Bg