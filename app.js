import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import fragment from "./shaders/fragment.glsl"
import vertex from "./shaders/vertex.glsl"

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
		const size = 0.5
		const points = 10
		const wireframe = true
		this.geometry = new THREE.PlaneBufferGeometry(
			size,
			size,
			points,
			points
		)
		this.material = new THREE.MeshNormalMaterial()

		this.material = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			fragmentShader: fragment,
			vertexShader: vertex,
			wireframe: wireframe,
		})

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
