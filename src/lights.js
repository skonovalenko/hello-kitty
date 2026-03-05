import * as THREE from "three";

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

export function createLights() {
  const front = new THREE.DirectionalLight(0xffffff, 0.8);
  front.position.z = 5;

  const top = new THREE.DirectionalLight(0xffffff, 0.8);
  top.position.set(5, 5, 5);

  return [ambientLight, front, top];
}
