import alessandraAnimations from "./scripts/alessandraAnimations";

export default class Alessandra {
  constructor(phaserScene) {
    this.phaserScene = phaserScene;

    alessandraAnimations.writeAnimation(phaserScene, "Sprites.enemies.alessandra.writing");

    this.sprite = phaserScene.physics.add
      .sprite(304, 9 * 12)
      .setSize(42, 48)
      .setOffset(0, 0)
      .setScale(2)
      .anims.play("writing", true);
  }
}
