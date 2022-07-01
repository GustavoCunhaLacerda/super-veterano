import playerAnimations from "./scripts/playerAnimations";
import addControlKeys from "./scripts/addControlKeys";
import playerControls from "./scripts/playerControls";

export default class Luiz {
  constructor(phaserScene) {
    this.phaserScene = phaserScene;

    playerAnimations.idleAnimation(phaserScene, "Sprites.player.luiz.idle");
    playerAnimations.walkAnimation(phaserScene, "Sprites.player.luiz.walk");
    playerAnimations.jumpAnimation(phaserScene, "Sprites.player.luiz.jump");

    addControlKeys(phaserScene);

    this.sprite = phaserScene.physics.add.sprite(0, 0, "Sprites.player.luiz.idle");
  }

  handleGameplay(phaserScene) {
    playerControls.jump(phaserScene);
    playerControls.walk(phaserScene);
  }
}
