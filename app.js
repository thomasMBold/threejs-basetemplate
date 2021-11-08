import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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

		//renderer
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		})
		this.renderer.setSize(this.width, this.height)
		this.container.appendChild(this.renderer.domElement)
		//
		//controls
		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		)
		//
		this.resize()
		this.setupResize()
		this.addObjects()
		this.render()
	}

	setupResize() {
		window.addEventListener(
			"resize",
			this.resize.bind(this)
		)
	}

	resize() {
		//get container sizes
		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight
		this.renderer.setSize(this.width, this.height)
		this.camera.aspect = this.width / this.height
		//update projection matrix
		this.camera.updateProjectionMatrix()
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
