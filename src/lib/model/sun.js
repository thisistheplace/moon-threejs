import React, {useRef, useEffect, useState, createRef} from 'react'
import {extend, useFrame} from '@react-three/fiber'
import * as THREE from 'three'

extend({THREE})

const Sun = (props) => {
  const ref = useRef()
  const refSun = createRef()
  const refLight = createRef()

  const [radius, setRadius] = useState(props.radius)

  useEffect(() => {
    // Apply to sun sphere
    refSun.current.geometry.translate(0, 0, radius * 3)
    refSun.current.updateMatrix()

    // Apply to light
    // set position so "top down" is pointing at the origin
    refLight.current.applyMatrix4(refSun.current.matrixWorld)
    refLight.current.position.set( 0, 0, radius * 3 ).normalize()
    // refLight.current.target = new THREE.Vector3(0, 0, 0)

    // Apply to sun and light group
    ref.current.position.set(0, 0, 0)

  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += -0.002;
    ref.current.rotation.y += -0.001;
  })

  return (
  <group ref={ref} dispose={null}>
      <mesh castShadow ref={refSun}>
        <sphereGeometry args={[radius / 8., 100, 100]}/>
        <meshBasicMaterial color={0xffd300}/>
      </mesh>
      <directionalLight castShadow ref={refLight} args={[0xffffff, 1]}/>
  </group>
  )
}

export {Sun}