import * as THREE from "three";

export function createEyes() {
  const geometry = new THREE.SphereGeometry(0.07, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0x000000 });

  const eye1 = new THREE.Mesh(geometry, material);
  eye1.position.set(-0.3, 0.2, 0.75);
  eye1.scale.set(0.9, 1.1, 1);

  const eye2 = eye1.clone();
  eye2.position.set(0.3, 0.2, 0.75);

  return [eye1, eye2];
}
