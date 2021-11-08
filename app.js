import * as THREE from "three"

export default class Sketch {
	constructor(options) {
		this.time = 0
		this.container = options.dom

		//create scene
		this.scene = new THREE.Scene()

		//get container sizes
		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight

		//create camera
		this.camera = new THREE.PerspectiveCamera(
			70,
			this.width / this.height,
			0.01,
			10
		)
		this.camera.position.z = 1

		this.addObjects()

		//renderer
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		})
		this.renderer.setSize(this.width, this.height)
		this.container.appendChild(this.renderer.domElement)
		//
		this.render()
	}

	resize() {
		//
	}

	addObjects() {
		this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
		this.material = new THREE.MeshNormalMaterial()

		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.mesh)
	}

	render() {
		//
		this.time += 0.05
		window.requestAnimationFrame(this.render.bind(this))

		this.mesh.rotation.x = this.time / 2000
		this.mesh.rotation.y = this.time / 1000

		this.renderer.render(this.scene, this.camera)
	}
}

new Sketch({
	dom: document.getElementById("container"),
})
