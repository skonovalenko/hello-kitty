import * as THREE from "three";
import { createHead } from "./head.js";
import { createEars } from "./ears.js";
import { createEyes } from "./eyes.js";
import { createNose } from "./nose.js";
import { createWhiskers } from "./whiskers.js";
import { createBow } from "./bow.js";

export function createKitty() {
  const kitty = new THREE.Group();
  kitty.scale.set(1.5, 1.5, 1.5);

  const { head, material } = createHead();
  kitty.add(head);
  kitty.add(...createEars(material));
  kitty.add(...createEyes());
  kitty.add(createNose());
  kitty.add(...createWhiskers(material));
  kitty.add(createBow());

  return kitty;
}
