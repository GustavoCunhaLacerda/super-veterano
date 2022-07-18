import dhiegoAnimations from "./scripts/dhiegoAnimations";

export default class Dhiego {
  constructor(phaserScene) {
    this.phaserScene = phaserScene;

    dhiegoAnimations.writeAnimation(phaserScene, "Sprites.enemies.dhiego.writing");

    this.sprite = phaserScene.physics.add
      .sprite(0)
      .setSize(42, 48)
      .setOffset(0, 0)
      .anims.play("d_writing", true);
  }
}
