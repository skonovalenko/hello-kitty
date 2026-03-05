import * as THREE from "three";

export function createEars(material) {
  const points = [];
  const height = 4;
  const step = 0.05;

  for (let y = 0; y <= height; y += step) {
    const radius = (3 / 2) * Math.sqrt(height - y);
    points.push(new THREE.Vector2(radius, y));
  }

  const geometry = new THREE.LatheGeometry(points, 32);

  const ear1 = new THREE.Mesh(geometry, material);
  ear1.position.set(-0.5, 0.5, 0);
  ear1.rotation.z = Math.PI / 6;
  ear1.scale.set(0.17, 0.17, 0.14);

  const ear2 = ear1.clone();
  ear2.position.set(0.5, 0.5, 0);
  ear2.rotation.z = -Math.PI / 6;
  ear2.scale.set(0.17, 0.17, 0.14);

  return [ear1, ear2];
}
