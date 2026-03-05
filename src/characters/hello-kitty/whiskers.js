import * as THREE from "three";

function makeWhisker(x, y, z, slope, material) {
  const geometry = new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8);
  const whisker = new THREE.Mesh(geometry, material);
  whisker.rotation.z = slope;
  whisker.position.set(x, y, z);
  return whisker;
}

export function createWhiskers(material) {
  return [
    makeWhisker(-0.8,  0.2, 0.6,  (-4 * Math.PI) / 7, material),
    makeWhisker( 0.8,  0.2, 0.6,   (4 * Math.PI) / 7, material),
    makeWhisker(-0.8,  0,   0.65,  -Math.PI / 2,       material),
    makeWhisker( 0.8,  0,   0.65,   Math.PI / 2,       material),
    makeWhisker(-0.7, -0.2, 0.65, (-4 * Math.PI) / 3,  material),
    makeWhisker( 0.7, -0.2, 0.65,  (4 * Math.PI) / 3,  material),
  ];
}
