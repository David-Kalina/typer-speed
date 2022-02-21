import { atom } from 'jotai'
import * as THREE from 'three'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'

const curve = new Curves.KnotCurve()
export const trackAtom = atom(new THREE.TubeBufferGeometry(curve, 200, 1, 8, true))

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
