import * as THREE from "three";

export function createBow() {
  const bow = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: 0xe91e36 });

  const center = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), material);
  center.position.x = 0.5;
  bow.add(center);

  const left = new THREE.Mesh(new THREE.SphereGeometry(0.25, 100, 100), material);
  left.position.x = 0.75;
  bow.add(left);

  const right = left.clone();
  right.position.x = 0.25;
  bow.add(right);

  bow.position.set(0.2, 1.01, 0.2);
  bow.rotation.z = -Math.PI / 7;

  return bow;
}
