import playerAnimations from "./scripts/playerAnimations";
import addControlKeys from "./scripts/addControlKeys";
import playerControls from "./scripts/playerControls";

export default class Luiz {
  constructor(phaserScene) {
    this.phaserScene = phaserScene;

    playerAnimations.idleAnimation(phaserScene, "luiz_idle");
    playerAnimations.walkAnimation(phaserScene, "luiz_walk");
    playerAnimations.jumpAnimation(phaserScene, "luiz_jump");

    addControlKeys(phaserScene);

    this.sprite = phaserScene.physics.add
      .sprite(36*16, 36*16)
      .setSize(10, 15)
      .setOffset(6, 8)
      .setScale(2.5);
    console.log(this.sprite);
  }

  handleGameplay() {
    playerControls.jump(this.phaserScene);
    playerControls.walk(this.phaserScene);
  }
}
