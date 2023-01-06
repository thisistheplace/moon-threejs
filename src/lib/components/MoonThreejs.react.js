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
            <Forest {...{radius: props.radius}}/>
        </>
    )
}

function MoonThreejs(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%"}}>
            <Canvas shadows style={{'background':'white'}} camera={{position: [2000, 0, 2000], fov:80, aspect:window.innerWidth / window.innerHeight, near: 200, far: 6000}}>
                <OrbitControls/>
                <axesHelper/>
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

// var canvas = document.getElementById('mycanvas');
// const SCREEN_WIDTH = canvas.getBoundingClientRect().width;
// const SCREEN_HEIGHT = canvas.getBoundingClientRect().height;

// var r = 450;

// let mouseY = 0,
// windowHalfY = window.innerHeight / 2;

// const stopcamera = false;
// const scene = new THREE.Scene();
// const theforest = new THREE.Group()
// const thesun = new THREE.Group();
// // const axesHelper = new THREE.AxesHelper( 5 );
// // scene.add( axesHelper );
// scene.background = new THREE.Color( 0xffffff );
// const [camera, renderer] = init();
// const controls = createControls(camera, renderer)
// // camera.up.set(0, 1, 0);
// camera.lookAt(0, 0, 0);
// animate();

// $(document).ready(function() {
//     // add forest
//     growforest();
// });

// function init() {
//     // define camera
//     const camera = new THREE.PerspectiveCamera( 80, SCREEN_WIDTH / SCREEN_HEIGHT, 200, 6000 );
//     camera.position.x = 2000;
//     camera.position.y = 0;
//     camera.position.z = 2000;
//     // camera.position.y = 50;
//     // camera.position.x = 1000;
//     // define renderer
//     const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: mycanvas } );
//     renderer.setPixelRatio( window.devicePixelRatio );
//     renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
//     document.body.appendChild( renderer.domElement );
//     document.body.style.touchAction = 'none';
//     // document.body.addEventListener( 'pointermove', onPointerMove, false );
//     window.addEventListener( 'resize', onWindowResize, false );
//     return [camera, renderer]
// }