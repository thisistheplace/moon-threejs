import React, {useRef, useState} from 'react'

const Moon = (props) => {
  const ref = useRef()
  const [radius, setRadius] = useState(props.radius)

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[radius, 100, 100]}/>
      <meshLambertMaterial color={0xffffff}/>
    </mesh>
  )
}

export {Moon}