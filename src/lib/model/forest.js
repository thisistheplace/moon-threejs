import React, {useRef, useEffect, useState} from 'react'
import {extend, useFrame} from '@react-three/fiber'
import * as THREE from 'three'

import growForest from './trees'

extend({THREE})

const Forest = (props) => {
  const ref = useRef()
  const [radius, setRadius] = useState(props.radius)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += 0.002;
    ref.current.rotation.y += 0.001;
  })

  useEffect(()=>{
    growForest(radius).forEach(tree => {
      ref.current.add(tree)
    })
  }, [radius])

  return (
    <group ref={ref} dispose={null}/>
  )
}

export {Forest}