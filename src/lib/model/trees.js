import {extend} from '@react-three/fiber'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

extend({THREE})

const VertexShader = `precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec3 offset;
attribute vec4 quaternion;

// function to apply quaternion to instanced geometry
// this rotates the position based on the instance quaternion
vec3 applyQuaternionToVector( vec4 q, vec3 v ){
    return v + 2.0 * cross( q.xyz, cross( q.xyz, v ) + q.w * v );
}

// main function run on GPU
void main() {
  vec3 newposition = applyQuaternionToVector(quaternion, position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( offset + newposition, 1.0 );
}
`

const FragmentShader = `precision highp float;
void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}
`

function growForest(radius){
  const trees = []
  // for number of random trees
  const nforests = 3;
  // rough spacing of trees
  // for the sphere this needs to be at least 90
  const scale = 45;
  // number of trees
  var ntrees = 1000;
  // initial tree height
  var height = 6
  // initial tree diameter
  var diameter = 0.5
  // forest depth
  const depth = 6;

  // array of indexes of trees
  const treeidx = Array.apply(null, {length: ntrees * nforests}).map(Number.call, Number)
  // holder to make sure we don't grow a tree which already exists!
  const growntree = []
  // array of x's
  const randx = Array.apply(null, {length: ntrees * nforests}).map(Function.call, Math.random)
  const allx = randx.map(x => x * scale * (Math.random() < 0.5 ? -1 : 1))
  // array of z's
  const randz = Array.apply(null, {length: ntrees * nforests}).map(Function.call, Math.random)
  const allz = randz.map(z => z * scale * (Math.random() < 0.5 ? -1 : 1))
  // standard material, just used for mesh generation
  const material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.8} );
  // instanced material!
  var mat = new THREE.RawShaderMaterial({
    uniforms: {},
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
    transparent: false
  });
  // loop through groups of random trees
  for (let iforest=0; iforest < nforests; iforest++){
      // grow a tree at the origin!
      var mothertree = createTree(0.0, 0.0, 0.0, height, diameter, depth, material)
      // create instance buffer geometry
      var forest = new THREE.InstancedBufferGeometry();
      forest.copy(mothertree)
      // set number of instances
      forest.instanceCount = ntrees
      // create buffer attribute arrays
      // these needs to be an offset array
      // these will be applied by the renderer on the GPU
      var offsets = new Float32Array(ntrees * 3)
      // also quaternions stores quaternions per instance
      // these will be applied by the renderer on the GPU
      var quaternions = new Float32Array(ntrees * 4)
      for (var i=0; i<ntrees; i++){
          // get random x position
          var randomtree = treeidx[Math.floor(Math.random() * treeidx.length)];
          // store tree position that has been grown, i.e. the instance
          growntree.push(randomtree)
          // spherical positioning
          // but if i=0 then fix to y axis
          if (i === 0){
              var spherecoords = new THREE.Vector3(0.0, radius, 0.0)
              var spherepos = new THREE.Spherical().setFromVector3(spherecoords)
          } else {
              var spherepos = new THREE.Spherical( radius, allx[randomtree], allz[randomtree] )
              var spherecoords = new THREE.Vector3()
              spherecoords.setFromSpherical(spherepos)
          };
          // calculate angle betwen vertical vector and vector from center
          // of sphere to base
          // get unit vector to tree base on sphere
          var unittree = new THREE.Vector3()
          unittree.setFromSpherical(spherepos)
          // make quaternion defining rotation
          var rot = new THREE.Quaternion();
          // calculate from vertical y vector
          rot.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unittree.normalize())
          rot.normalize()
          // store in rotation matrix
          quaternions[i * 4] = rot.x
          quaternions[i * 4 + 1] = rot.y
          quaternions[i * 4 + 2] = rot.z
          quaternions[i * 4 + 3] = rot.w
          // generate offset coordinates
          offsets[i * 3] = spherecoords.x
          offsets[i * 3 + 1] = spherecoords.y
          offsets[i * 3 + 2] = spherecoords.z
      }
      // apply offsets to instanced geometry
      forest.setAttribute( 'offset', new THREE.InstancedBufferAttribute( offsets, 3 ) );
      forest.setAttribute( 'quaternion', new THREE.InstancedBufferAttribute( quaternions, 4 ) );
      // create forest mesh
      var forestmesh = new THREE.Mesh(forest, mat);
      forestmesh.updateMatrix()
      // add to array
      trees.push(forestmesh);
  };
  return trees
};

function createTree(x, y, z, height, diam, depth, material){
  // creates a random tree
  // then instances it to array
  // first create group gridholder
  let mygroup = new THREE.Group()
  var point1 = new THREE.Vector3(x, y, z)
  var point2 = new THREE.Vector3(x, y + height, z)
  var trunk = cylinderMesh(point2, point1, material, diam, diam)
  // var trunk = lineMesh(point2, point1, material, 0.1, 0.1)
  // make sure matrix is up to date
  trunk.updateMatrix()
  // get geometry
  var trunkgeom = trunk.geometry
  // update branch geometry with mesh matrix
  trunkgeom.applyMatrix4(trunk.matrix)
  // create holder for all branches
  var geoms = []
  geoms.push(trunkgeom)
  // create branches
  drawTree(x, y + height, z, 360, depth, height, diam, material, mygroup)
  // now group everything
  for (var i=0; i < mygroup.children.length; i++){
      // get branch mesh
      var thisbranch = mygroup.children[i]
      // make sure matrix is up to date
      thisbranch.updateMatrix()
      // get geometry
      var geom = thisbranch.geometry
      // apply mesh matrix to geometry to position properly
      geom.applyMatrix4(thisbranch.matrix)
      geoms.push(geom)
  };
  // make a single geometry from all
  var singletree = BufferGeometryUtils.mergeBufferGeometries(geoms, false)
  return singletree
}

function drawTree(x1, y1, z1, angle, depth, length, diam, material, mygroup){
  if (depth > 0){
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    angle = angle * plusOrMinus
    var x2 = x1 + (Math.cos((Math.random() + Math.random()) * angle * Math.PI / 180) * ((depth - 1) / depth) * length);
    var z2 = z1 + (Math.sin((Math.random() + Math.random()) * angle * Math.PI / 180) * ((depth - 1) / depth) * length);
    var y2 = y1 + (0.5 * Math.random() * depth * length)
    var point1 = new THREE.Vector3(x1, y1, z1)
    var point2 = new THREE.Vector3(x2, y2, z2)
    var newdiam = diam * (depth - 1) / depth
    var branch = cylinderMesh(point2, point1, material, diam, newdiam)
    // var branch = lineMesh(point2, point1, material, diam, newdiam)
    mygroup.add(branch)
    drawTree(x2, y2, z2, -1.0 * angle, depth - 1, length, newdiam, material, mygroup);
    drawTree(x2, y2, z2, 1.0 * angle, depth - 1, length, newdiam, material, mygroup);
  }
}

function cylinderMesh(point1, pointY, material, diam1, diam2) {
  var direction = new THREE.Vector3().subVectors(pointY, point1);
  var orientation = new THREE.Matrix4();
  orientation.lookAt(point1, pointY, new THREE.Object3D().up);
  orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 0,
      0, 0, 0, 1));
  var edgeGeometry = new THREE.CylinderGeometry(diam1, diam2, direction.length(), 3, 1);
  var edge = new THREE.Mesh(edgeGeometry, material);
  edge.applyMatrix4(orientation);
  // position based on midpoints - there may be a better solution than this
  edge.position.x = (pointY.x + point1.x) / 2;
  edge.position.y = (pointY.y + point1.y) / 2;
  edge.position.z = (pointY.z + point1.z) / 2;
  return edge;
}

export default growForest