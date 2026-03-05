import * as THREE from "three";

export function createOtter() {
  const group = new THREE.Group();

  const furMat   = new THREE.MeshPhongMaterial({ color: 0x5c3a1e });   // dark brown
  const faceMat  = new THREE.MeshPhongMaterial({ color: 0xc8a882 });   // cream/tan muzzle
  const noseMat  = new THREE.MeshStandardMaterial({ color: 0x1a0d00 });
  const eyeMat   = new THREE.MeshStandardMaterial({ color: 0x0d0804 });
  const sparkMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const innerEarMat = new THREE.MeshPhongMaterial({ color: 0x9c6040 });

  // ── Main head ─────────────────────────────────────────────────────────
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), furMat);
  group.add(head);

  // ── Cream face patch (flat oval on the front) ─────────────────────────
  const patch = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32), faceMat);
  patch.scale.set(0.9, 0.85, 0.38);
  patch.position.set(0, -0.12, 0.72);
  group.add(patch);

  // ── Rounded muzzle ────────────────────────────────────────────────────
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), faceMat);
  muzzle.scale.set(1, 0.72, 0.65);
  muzzle.position.set(0, -0.26, 0.86);
  group.add(muzzle);

  // ── Nose (wide flat oval — characteristic otter nose) ─────────────────
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), noseMat);
  nose.scale.set(1.6, 0.9, 0.8);
  nose.position.set(0, -0.12, 0.93);
  group.add(nose);

  // ── Small round ears (low on the sides — otter ears sit low) ─────────
  const earGeo = new THREE.SphereGeometry(0.2, 24, 24);

  const ear1 = new THREE.Mesh(earGeo, furMat);
  ear1.scale.set(1, 0.85, 0.65);
  ear1.position.set(-0.82, 0.52, 0.08);
  group.add(ear1);

  const ear2 = ear1.clone();
  ear2.position.set(0.82, 0.52, 0.08);
  group.add(ear2);

  const innerEar1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), innerEarMat);
  innerEar1.scale.set(1, 0.8, 0.35);
  innerEar1.position.set(-0.83, 0.53, 0.24);
  group.add(innerEar1);

  const innerEar2 = innerEar1.clone();
  innerEar2.position.set(0.83, 0.53, 0.24);
  group.add(innerEar2);

  // ── Eyes (large, round, dark — expressive otter eyes) ─────────────────
  const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.115, 24, 24), eyeMat);
  eye1.position.set(-0.31, 0.15, 0.87);
  eye1.scale.set(0.95, 1.05, 0.75);
  group.add(eye1);

  const eye2 = eye1.clone();
  eye2.position.set(0.31, 0.15, 0.87);
  group.add(eye2);

  // Eye highlights
  const spark1 = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), sparkMat);
  spark1.position.set(-0.26, 0.21, 0.95);
  group.add(spark1);

  const spark2 = spark1.clone();
  spark2.position.set(0.36, 0.21, 0.95);
  group.add(spark2);

  // ── Whiskers ──────────────────────────────────────────────────────────
  const whiskerMat = new THREE.MeshPhongMaterial({ color: 0xd4c4a8 });

  function whisker(x, y, z, rotZ) {
    const geo = new THREE.CylinderGeometry(0.012, 0.012, 0.5, 6);
    const w   = new THREE.Mesh(geo, whiskerMat);
    w.rotation.z = rotZ;
    w.position.set(x, y, z);
    return w;
  }

  group.add(
    whisker(-0.75,  -0.2, 0.75, (-5 * Math.PI) / 9),
    whisker( 0.75,  -0.2, 0.75,  (5 * Math.PI) / 9),
    whisker(-0.78, -0.28, 0.76, -Math.PI / 2),
    whisker( 0.78, -0.28, 0.76,  Math.PI / 2),
    whisker(-0.68, -0.38, 0.76, (-4 * Math.PI) / 7),
    whisker( 0.68, -0.38, 0.76,  (4 * Math.PI) / 7),
  );

  group.scale.set(1.5, 1.5, 1.5);
  return group;
}
