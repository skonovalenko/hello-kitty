import * as THREE from "three";

export function createNose() {
  const geometry = new THREE.SphereGeometry(0.07, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
  const nose = new THREE.Mesh(geometry, material);
  nose.position.set(0, 0, 0.75);
  nose.scale.set(1.1, 0.9, 1);
  return nose;
}
