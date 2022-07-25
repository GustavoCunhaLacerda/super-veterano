import Enemy from "../Enemy";

export default class Dog extends Enemy {
  constructor(phaserScene) {
    super(phaserScene, "Somacão", "dog", 2, "Sprites.enemies.dog.idle", true, [0, 1, 2]);
  }
}
