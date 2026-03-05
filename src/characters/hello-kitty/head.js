import * as THREE from "three";

export function createHead() {
  const geometry = new THREE.CapsuleGeometry(0.9, 0.4, 32, 32);
  geometry.rotateZ(Math.PI / 2);
  const material = new THREE.MeshPhongMaterial({ color: 0xffc5d3 });
  const head = new THREE.Mesh(geometry, material);
  head.scale.set(1, 1, 0.85);
  return { head, material };
}
