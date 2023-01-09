import PropTypes from 'prop-types';

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {Loader, OrbitControls} from '@react-three/drei'

import {Sun} from "../model/sun"
import {Moon} from "../model/moon"
import {Forest} from "../model/forest"

const Model = (props) => {
    return (
        <>
            <Moon {...{radius: props.radius}}/>
            <Sun {...{radius: props.radius}}/>
            <Forest {...props}/>
        </>
    )
}

function MoonThreejs(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%"}}>
            <Canvas shadows style={{'background':'white'}} camera={{position: [2000, 0, 2000], fov:80, aspect:window.innerWidth / window.innerHeight, near: 200, far: 6000}}>
                <OrbitControls/>
                <Suspense fallback={null}>
                    <Model {...props}/>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    )
}

MoonThreejs.defaultProps = {
};

MoonThreejs.propTypes = {
    id: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired
};

export default MoonThreejs;