import * as THREE from "three";

function createStripeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Orange base
  ctx.fillStyle = "#E8720C";
  ctx.fillRect(0, 0, 512, 512);

  // Black wavy stripes
  ctx.fillStyle = "#0d0900";
  [
    { y: 55,  w: 30 },
    { y: 130, w: 22 },
    { y: 205, w: 32 },
    { y: 290, w: 24 },
    { y: 370, w: 28 },
    { y: 448, w: 20 },
  ].forEach(({ y, w }) => {
    ctx.beginPath();
    ctx.moveTo(0, y - w / 2);
    ctx.bezierCurveTo(140, y - w / 2 - 14, 370, y - w / 2 + 14, 512, y - w / 2);
    ctx.lineTo(512, y + w / 2);
    ctx.bezierCurveTo(370, y + w / 2 + 14, 140, y + w / 2 - 14, 0, y + w / 2);
    ctx.closePath();
    ctx.fill();
  });

  return new THREE.CanvasTexture(canvas);
}

export function createTigger() {
  const group = new THREE.Group();

  const orangeMat = new THREE.MeshPhongMaterial({ color: 0xE8720C });
  const whiteMat  = new THREE.MeshPhongMaterial({ color: 0xfff8e8 });
  const darkMat   = new THREE.MeshPhongMaterial({ color: 0x0d0900 });
  const noseMat   = new THREE.MeshPhongMaterial({ color: 0x8b2500 });
  const pinkMat   = new THREE.MeshPhongMaterial({ color: 0xf0a090 });

  // ── Striped head ──────────────────────────────────────────────────────
  const headMat = new THREE.MeshPhongMaterial({ map: createStripeTexture() });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.92, 64, 64), headMat);
  group.add(head);

  // ── Ears — small, round, on top-sides ────────────────────────────────
  const earGeo = new THREE.SphereGeometry(0.26, 24, 24);

  const ear1 = new THREE.Mesh(earGeo, orangeMat);
  ear1.scale.set(1, 0.9, 0.68);
  ear1.position.set(-0.7, 0.74, 0.08);
  group.add(ear1);

  const ear2 = ear1.clone();
  ear2.position.set(0.7, 0.74, 0.08);
  group.add(ear2);

  // Inner ear
  const inner1 = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), pinkMat);
  inner1.scale.set(1, 0.75, 0.35);
  inner1.position.set(-0.7, 0.76, 0.27);
  group.add(inner1);

  const inner2 = inner1.clone();
  inner2.position.set(0.7, 0.76, 0.27);
  group.add(inner2);

  // ── White muzzle / chin area (Tigger's cream face patch) ─────────────
  // Large flat oval covering the bottom-front of the face
  const muzzlePatch = new THREE.Mesh(new THREE.SphereGeometry(0.58, 32, 32), whiteMat);
  muzzlePatch.scale.set(0.88, 0.72, 0.48);
  muzzlePatch.position.set(0, -0.28, 0.68);
  group.add(muzzlePatch);

  // ── Large round white eye patches ─────────────────────────────────────
  const eyePatch1 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), whiteMat);
  eyePatch1.scale.set(1.05, 1.2, 0.52);
  eyePatch1.position.set(-0.31, 0.25, 0.83);
  group.add(eyePatch1);

  const eyePatch2 = eyePatch1.clone();
  eyePatch2.position.set(0.31, 0.25, 0.83);
  group.add(eyePatch2);

  // ── Eyes — large oval, very expressive ───────────────────────────────
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x080400 });
  const eye1   = new THREE.Mesh(new THREE.SphereGeometry(0.155, 24, 24), eyeMat);
  eye1.scale.set(0.88, 1.1, 0.65);
  eye1.position.set(-0.31, 0.26, 0.94);
  group.add(eye1);

  const eye2 = eye1.clone();
  eye2.position.set(0.31, 0.26, 0.94);
  group.add(eye2);

  // Shine
  const sparkMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const spark1   = new THREE.Mesh(new THREE.SphereGeometry(0.048, 8, 8), sparkMat);
  spark1.position.set(-0.24, 0.33, 1.02);
  group.add(spark1);

  const spark2 = spark1.clone();
  spark2.position.set(0.38, 0.33, 1.02);
  group.add(spark2);

  // ── Very prominent nose — Tigger's signature feature ──────────────────
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 32), noseMat);
  nose.scale.set(1.25, 0.9, 0.82);
  nose.position.set(0, -0.06, 0.9);
  group.add(nose);

  // Nose highlight
  const noseShine = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), sparkMat);
  noseShine.position.set(-0.07, 0.02, 1.09);
  noseShine.scale.set(1, 0.7, 0.7);
  group.add(noseShine);

  // ── Smile ─────────────────────────────────────────────────────────────
  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.028, 8, 24, Math.PI),
    darkMat
  );
  smile.rotation.z = Math.PI;
  smile.position.set(0, -0.38, 0.9);
  group.add(smile);

  group.scale.set(1.5, 1.5, 1.5);
  return group;
}
