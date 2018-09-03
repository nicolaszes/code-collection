import * as React from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui'

import '../utils/ConvexGeometry'
import '../utils/ParametricGeometries'
import Stats from '../utils/stats'

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.domElement)

const scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true

const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true

plane.rotation.x = -0.5 * Math.PI
plane.position.x = 0
plane.position.y = 0
plane.position.z = 0

scene.add(plane)

camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(new THREE.Vector3(-10, 0, 0))

const ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)
// add spotlight for the shadows
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40, 60, -10)
spotLight.castShadow = true
scene.add(spotLight)

scene.fog = new THREE.FogExp2(0xffffff, 0.01)
scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })

/**
 * set default rotate speed
 * add cube
 * remove cube
 * output object
 */
function Controls() {
  const { children } = scene
  this.rotationSpeed = 0.02
  this.numberOfObjects = children.length
  this.removeCube = function () {
    var lastObject = children[children.length - 1]
    if (lastObject instanceof THREE.Mesh) {
      scene.remove(lastObject)
      this.numberOfObjects = children.length
    }
  }
  this.addCube = function () {
    const cubeSize = Math.ceil((Math.random() * 3))
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff})
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.name = "cube-" + children.length
    // position the cube randomly in the scene
    cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width))
    cube.position.y = Math.round((Math.random() * 5))
    cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height))
    // add the cube to the scene
    scene.add(cube)
    this.numberOfObjects = children.length
  }
  this.outputObjects = function () {
    console.log(children)
  }
}
const controls = new Controls()
const gui = new dat.GUI()
gui.add(controls, 'rotationSpeed', 0, 0.5)
gui.add(controls, 'addCube')
gui.add(controls, 'removeCube')
gui.add(controls, 'outputObjects')
gui.add(controls, 'numberOfObjects').listen()

/**
 * add geometries
 */
addGeometries(scene)
function addGeometries(scene) {
  let geoms = []
  geoms.push(new THREE.CylinderGeometry(1, 4, 4))
  // basic cube
  geoms.push(new THREE.BoxGeometry(2, 2, 2))
  // basic sphere
  geoms.push(new THREE.SphereGeometry(2))
  geoms.push(new THREE.IcosahedronGeometry(4))

  // create a convex shape
  // using a couple points
  // for instance a cube
  var points = [
    new THREE.Vector3(2, 2, 2),
    new THREE.Vector3(2, 2, -2),
    new THREE.Vector3(-2, 2, -2),
    new THREE.Vector3(-2, 2, 2),
    new THREE.Vector3(2, -2, 2),
    new THREE.Vector3(2, -2, -2),
    new THREE.Vector3(-2, -2, -2),
    new THREE.Vector3(-2, -2, 2)
  ]
  geoms.push(new THREE.ConvexGeometry(points))

  // create a lathgeometry
  const pts = []
  const detail = .1
  const radius = 3
  for (let angle = 0.0; angle < Math.PI; angle += detail)
    pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))

  geoms.push(new THREE.LatheGeometry(pts, 12))

  // create a OctahedronGeometry
  geoms.push(new THREE.OctahedronGeometry(3))

  // create a geometry
  geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.klein, 25, 25))

  // geoms.push(new THREE.TetrahedronGeometry(3))

  // geoms.push(new THREE.TorusGeometry(3, 1, 10, 10))

  // geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20))

  let j = 0
  for (let i = 0; i < geoms.length; i++) {
    // var cubeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: Math.random() * 0xffffff})
    const materials = [
      new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.FlatShading}),
      new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
    ]
    // const mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials)
    // console.log(mesh)
    // mesh.traverse(function (e) {
    //   e.castShadow = true
    // })
    const mesh = new THREE.Mesh(geoms[i],materials[i])
    mesh.castShadow = true
    mesh.position.x = -24 + ((i % 4) * 12)
    mesh.position.y = 4
    mesh.position.z = -8 + (j * 12)
    if ((i + 1) % 4 == 0) j++
    scene.add(mesh)
  }
}

/**
 * render
 * add animate frame
 */
function render() {
  stats.update()
  // rotate the cubes around its axes
  // scene.traverse(function (e) {
  //   if (e instanceof THREE.Mesh && e !== plane) {
  //     e.rotation.x += controls.rotationSpeed
  //     e.rotation.y += controls.rotationSpeed
  //     e.rotation.z += controls.rotationSpeed
  //   }
  // })
  // render using requestAnimationFrame
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}
render()

document.body.appendChild(renderer.domElement)

export default () => <div></div>