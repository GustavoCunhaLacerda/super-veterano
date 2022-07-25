import dhiegoAnimations from "./scripts/dhiegoAnimations";
import Enemy from "../../Enemy";

export default class Dhiego extends Enemy {
  constructor(phaserScene) {
    super(phaserScene, "Dhiego", "dhiego", 10, "Sprites.enemies.dhiego.writing", true, [0, 1, 2]);
  }
}