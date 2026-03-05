import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createKitty }  from "./characters/hello-kitty/index.js";
import { createTigger } from "./characters/tigger/index.js";
import { createOtter }  from "./characters/otter/index.js";
import { createLights, ambientLight } from "./lights.js";

// ── Renderer ──────────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// ── Scene / Camera / Controls ─────────────────────────────────────────────
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.3, 0);
controls.enablePan = false;
controls.update();

scene.add(...createLights());

// ── World group (used for responsive scaling) ─────────────────────────────
const world = new THREE.Group();
scene.add(world);

function updateWorldScale() {
  const w = window.innerWidth;
  const s = w < 480 ? 0.6 : w < 768 ? 0.78 : 1;
  world.scale.setScalar(s);
}
updateWorldScale();

// ── Characters ────────────────────────────────────────────────────────────
const pages = [
  {
    model:        createKitty(),
    name:         "Hello Kitty",
    role:         "The Classic",
    desc:         "Kitty White — born in London, lives in Tokyo. No mouth, infinite expression. The original icon of Sanrio since 1974.",
    year:         "1974",
    ambientColor: 0xffe0f0,
    accent:       "#ff69b4",
    bgFrom:       "#8b0050",
    bgTo:         "#2e0018",
  },
  {
    model:        createTigger(),
    name:         "Tigger",
    role:         "The Bouncy One",
    desc:         "The most wonderful thing about Tiggers is — Tiggers are wonderful things! Loud, proud, and always bouncing.",
    year:         "1928",
    ambientColor: 0xff6600,
    accent:       "#ff6600",
    bgFrom:       "#7a2e00",
    bgTo:         "#2a0f00",
  },
  {
    model:        createOtter(),
    name:         "Otter",
    role:         "The Curious One",
    desc:         "Playful, clever, and always up to something. Lives near the water, loves to explore, and never takes life too seriously.",
    year:         "∞",
    ambientColor: 0x6b3a1f,
    accent:       "#a0622a",
    bgFrom:       "#3d1a00",
    bgTo:         "#130800",
  },
];

pages.forEach(({ model }) => {
  model.visible = false;
  world.add(model);
});

// ── Page state ────────────────────────────────────────────────────────────
let current = 0;

const overlay   = document.getElementById("transition");
const nameEl    = document.getElementById("char-name");
const roleEl    = document.getElementById("char-role");
const descEl    = document.getElementById("char-desc");
const yearEl    = document.getElementById("char-year");
const counterEl = document.querySelector(".counter");
const dotsEl    = document.querySelectorAll(".dot");
const prevBtn   = document.getElementById("prev");
const nextBtn   = document.getElementById("next");

function updateUI(index) {
  const p = pages[index];
  nameEl.textContent = p.name;
  roleEl.textContent = p.role;
  descEl.textContent = p.desc;
  yearEl.textContent = p.year;
  dotsEl.forEach((d, i) => d.classList.toggle("active", i === index));
  counterEl.textContent = `${String(index + 1).padStart(2, "0")} — ${String(pages.length).padStart(2, "0")}`;
  ambientLight.color.setHex(pages[index].ambientColor);
  const root = document.documentElement;
  root.style.setProperty("--accent",  pages[index].accent);
  root.style.setProperty("--bg-from", pages[index].bgFrom);
  root.style.setProperty("--bg-to",   pages[index].bgTo);
}

function goTo(index) {
  if (index === current) return;
  overlay.classList.add("visible");

  setTimeout(() => {
    pages[current].model.visible = false;
    controls.reset();
    current = index;
    pages[current].model.visible = true;
    updateUI(current);
    overlay.classList.remove("visible");
  }, 280);
}

// Init
pages[current].model.visible = true;
updateUI(current);

window.goTo = goTo;

prevBtn.addEventListener("click", () => goTo((current + pages.length - 1) % pages.length));
nextBtn.addEventListener("click", () => goTo((current + 1) % pages.length));
dotsEl.forEach((d, i) => d.addEventListener("click", () => goTo(i)));

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft")  goTo((current + pages.length - 1) % pages.length);
  if (e.key === "ArrowRight") goTo((current + 1) % pages.length);
});

// Swipe navigation
let touchStartX = 0;
window.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
window.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) < 50) return;
  if (dx < 0) goTo((current + 1) % pages.length);
  else        goTo((current + pages.length - 1) % pages.length);
}, { passive: true });

// ── Animate ───────────────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateWorldScale();
});
