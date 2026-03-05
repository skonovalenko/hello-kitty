import * as THREE from "three";

function createSparkleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0,   "rgba(255,255,255,1)");
  grad.addColorStop(0.2, "rgba(255,255,255,0.8)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.2)");
  grad.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function createParticles() {
  const COUNT = 70;

  const positions = new Float32Array(COUNT * 3);
  const speeds    = new Float32Array(COUNT);
  const driftFreq = new Float32Array(COUNT);
  const driftAmp  = new Float32Array(COUNT);
  const sizes     = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 5.5;   // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;     // y  — start spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;   // z
    speeds[i]    = 0.004 + Math.random() * 0.008;
    driftFreq[i] = 0.4  + Math.random() * 0.8;
    driftAmp[i]  = 0.003 + Math.random() * 0.006;
    sizes[i]     = 0.06 + Math.random() * 0.1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    color:          0xff69b4,
    size:           0.09,
    map:            createSparkleTexture(),
    transparent:    true,
    opacity:        0.75,
    depthWrite:     false,
    blending:       THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);

  function update(time) {
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += speeds[i];
      pos[i * 3]     += Math.sin(time * driftFreq[i] + i) * driftAmp[i];

      // Reset particle to bottom when it floats off the top
      if (pos[i * 3 + 1] > 3.2) {
        pos[i * 3]     = (Math.random() - 0.5) * 5.5;
        pos[i * 3 + 1] = -2.8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  }

  function setColor(hex) {
    material.color.setHex(hex);
  }

  return { points, update, setColor };
}
