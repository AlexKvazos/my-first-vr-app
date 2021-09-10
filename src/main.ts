import "./style.css"
import {
  Scene,
  BoxGeometry,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  MeshNormalMaterial,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
  Group,
} from "three"
import { VRButton } from "three/examples/jsm/webxr/VRButton"

const scene = new Scene()

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.lookAt(0, 0, 0)
camera.position.set(0, 0, 5)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.xr.enabled = true
renderer.xr.setReferenceSpaceType("local")
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
})
document.body.appendChild(renderer.domElement)
document.body.appendChild(VRButton.createButton(renderer))

const cameraHolder = new Group()

cameraHolder.add(camera)
cameraHolder.position.set(0, 0, 10)

scene.add(cameraHolder)

const geometry = new BoxGeometry()
const material = new MeshNormalMaterial()
const cube = new Mesh(geometry, material)
scene.add(cube)

const lineMaterial = new LineBasicMaterial({ color: 0xff00ff })
const points = [
  new Vector3(0, 3, 0),
  new Vector3(-3, 0, 0),
  new Vector3(0, -3, 0),
  new Vector3(3, 0, 0),
  new Vector3(0, 3, 0),
]
const lineGeometry = new BufferGeometry().setFromPoints(points)
const line = new Line(lineGeometry, lineMaterial)

scene.add(line)
