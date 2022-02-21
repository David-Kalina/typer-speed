import { atom } from 'jotai'
import * as THREE from 'three'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'

const curve = new Curves.CinquefoilKnot()

let guid = 1

export const trackAtom = atom(new THREE.TubeBufferGeometry(curve, 100, 1, 8, true))

export const clockAtom = atom(new THREE.Clock())

export const fovAtom = atom(75)

export const cameraAtom = atom(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000))

export const updateCameraAtom = atom(
  () => '',
  get => {
    const clock = get(clockAtom)
    const camera = get(cameraAtom)

    const time = clock.getElapsedTime()
    const loopTime = 100
    const t = (time % loopTime) / loopTime
    const t2 = ((time + 0.1) % loopTime) / loopTime

    const pos = get(trackAtom).parameters.path.getPointAt(t)
    const pos2 = get(trackAtom).parameters.path.getPointAt(t2)

    camera.position.copy(pos)
    camera.lookAt(pos2)
  }
)

function randomData(
  count: number,
  track: THREE.TubeGeometry,
  radius: number,
  size: number,
  scale: number | (() => number)
) {
  return new Array(count).fill(0).map(() => {
    const t = Math.random()
    const pos = track.parameters.path.getPointAt(t)
    pos.multiplyScalar(1.4)
    const offset = pos
      .clone()
      .add(
        new THREE.Vector3(
          -radius + Math.random() * radius * 2,
          -radius + Math.random() * radius * 2,
          -radius + Math.random() * radius * 2
        )
      )
    const speed = 0.1 + Math.random()
    return {
      guid: guid++,
      scale: typeof scale === 'function' ? scale() : scale,
      size,
      offset,
      pos,
      speed,
      radius,
      t,
      hit: new THREE.Vector3(),
      distance: 10,
    }
  })
}

export const asteroidsAtom = atom(get => randomData(8, get(trackAtom), 1, 0.1, 0.1))

export const frigatesAtom = atom(get => randomData(1, get(trackAtom), 0.5, 0.1, 0.1))
