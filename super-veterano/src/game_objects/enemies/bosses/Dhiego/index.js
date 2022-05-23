import dhiegoAnimations from "./scripts/dhiegoAnimations";

export default class Dhiego {
  constructor(phaserScene) {
    this.phaserScene = phaserScene;

    dhiegoAnimations.writeAnimation(phaserScene, "dhiego_writing");

    this.sprite = phaserScene.physics.add
      .sprite(304, 9 * 12)
      .setSize(42, 48)
      .setOffset(0, 0)
      .setScale(2)
      .anims.play("writing", true);
  }
}
