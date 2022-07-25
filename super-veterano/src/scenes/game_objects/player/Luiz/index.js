import playerAnimations from "./scripts/playerAnimations";
import addControlKeys from "./scripts/addControlKeys";
import playerControls from "./scripts/playerControls";

export default class Luiz {
  static lifePoints = 10;
  constructor(phaserScene) {
    this.phaserScene = phaserScene;
    playerAnimations.idleAnimation(phaserScene, "Sprites.player.luiz.idle");
    playerAnimations.walkAnimation(phaserScene, "Sprites.player.luiz.walk");
    playerAnimations.jumpAnimation(phaserScene, "Sprites.player.luiz.jump");
  }

  invokePlayerTotem(phaserScene, life = true) {
    const totem = phaserScene.physics.add.sprite(0, 0, "Sprites.player.luiz.idle");
    totem.anims.play("idle", true);
    totem.body.setAllowGravity(false);

    if (life) {
      this.name = phaserScene.add.text(0, 0, `Luiz`, {
        fontSize: "16px",
        fill: "#000",
        align: "center",
      });

      this.lifePointsText = phaserScene.add.text(0, 0, `${Luiz.lifePoints}/10`, {
        fontSize: "16px",
        fill: "#000",
        align: "center",
      });
      this.phaserScene.customGrid.placeAtIndex(3, this.name);
      this.phaserScene.customGrid.placeAtIndex(23, this.lifePointsText);
    }

    return totem;
  }

  invokePlayableCharacter() {
    const sprite = this.phaserScene.physics.add.sprite(0, 0, "Sprites.player.luiz.idle");
    sprite.anims.play("idle", true);

    addControlKeys(this.phaserScene);

    this.playerLifePointsText = this.phaserScene.add.text(0, 0, "Vida: " + Luiz.lifePoints, {
      fontSize: "16px",
      fill: "#000",
      align: "center",
    });
    this.phaserScene.customGrid.placeAtIndex(0, this.playerLifePointsText);

    return sprite;
  }

  handleGameplay(phaserScene, sprite) {
    playerControls.jump(phaserScene, sprite);
    playerControls.walk(phaserScene, sprite);
  }

  damage(damage) {
    Luiz.lifePoints -= damage;
    this.lifePointsText.setText(`${Luiz.lifePoints}/10`);
    this.playerLifePointsText.setText("Vida: " + Luiz.lifePoints);
    this.endGameCheck();
  }

  endGameCheck() {
    if (this.lifePoints <= 0) {
      this.phaserScene.scene.start("gameover");
    }
  }
}
