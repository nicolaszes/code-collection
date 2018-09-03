import * as THREE from 'three'
import * as React from 'react'
// import * as dat from 'dat.gui'

import Stats from '../utils/stats'
import './index.less'

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom)

// create a scene, that will hold all our elements such as object, cameras and lights
const scene = new THREE.Scene()

// create a camera, which defines where we're looking at
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)

// create a render and set the size
const renderer = new THREE.WebGLRenderer()

// renderer.setClearColorHex()
renderer.setClearColor(new THREE.Color(0xEEEEEE))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true

// show axes in the screen
const axes = new THREE.AxesHelper(20)
scene.add(axes)

// create the ground plane
const planeGeometry = new THREE.PlaneGeometry(60, 20, 10, 10)
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

plane.receiveShadow = true
plane.rotation.x = -.5 * Math.PI
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0

scene.add(plane)

// create a cube
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// position the cube
cube.castShadow = true
cube.position.x = -4
cube.position.y = 3
cube.position.z = 0
// add the cube to the scene
scene.add(cube)

// create a sphere
const sphereGeometry = new THREE.SphereGeometry(4, 30, 30)
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

// position the sphere
sphere.castShadow = true
sphere.position.x = 20
sphere.position.y = 4
sphere.position.z = 2
// add the sphere to the scene
scene.add(sphere)

// position and point the camera to the center of the scene
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)

const ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)

const soptLight = new THREE.SpotLight(0xffffff)
soptLight.position.set(-40, 60, -10)
soptLight.castShadow = true
scene.add(soptLight)

// document.body.appendChild(renderer.domElement);
// renderer.render(scene, camera);

let step = 0

function Controls () {
  this.rotationSpeed = 0.02
  this.bouncingSpeed = 0.03
}
const controls = new Controls()
// const gui = new dat.GUI()
// gui.add(controls, 'rotationSpeed', 0, 0.5)
// gui.add(controls, 'bouncingSpeed', 0, 0.5)

renderScene()

function renderScene() {
  stats.update()

  // rotate the cube around its axes
  cube.rotation.x += controls.rotationSpeed
  cube.rotation.y += controls.rotationSpeed
  cube.rotation.z += controls.rotationSpeed

  // bounce the sphere up and down
  step += controls.bouncingSpeed
  sphere.position.x = 20 + ( 10 * (Math.cos(step)))
  sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)))
  // render using requestAnimationFrame
  requestAnimationFrame(renderScene)
  renderer.render(scene, camera)
}

function onResize() {
  console.log('onResize')
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onResize, false)

export default () => <div/>
