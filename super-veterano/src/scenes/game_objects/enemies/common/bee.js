export default class Bee {
  constructor(phaserScene) {
    this.lifePoints = 2;
    this.phaserScene = phaserScene;
    this.body = null;

    this.idleAnimation(phaserScene, "Sprites.enemies.bee.idle");
  }

  invokeEnemyCharacter() {
    const sprite = this.phaserScene.physics.add.sprite(0, 0, "Sprites.enemies.bee.idle");
    sprite.anims.play("bee_idle", true);
    sprite.body.setAllowGravity(false);

    this.body = sprite;

    return sprite;
  }

  invokeEnemyTotem(phaserScene) {
    const totem = phaserScene.physics.add.sprite(0, 0, "Sprites.enemies.bee.idle");
    totem.anims.play("bee_idle", true);
    totem.body.setAllowGravity(false);

    this.name = phaserScene.add.text(0, 0, `Somabelha`, {
      fontSize: "16px",
      fill: "#000",
      align: "center",
    });

    this.lifePointsText = phaserScene.add.text(0, 0, `${this.lifePoints}/2`, {
      fontSize: "16px",
      fill: "#000",
      align: "center",
    });

    this.phaserScene.customGrid.placeAtIndex(33, this.name);
    this.phaserScene.customGrid.placeAtIndex(55, this.lifePointsText);

    return totem;
  }

  damage(damage) {
    this.lifePoints -= damage;
    this.lifePointsText.setText(`${this.lifePoints}/2`);

    if (this.lifePoints <= 0) {
      this.body.destroy();
      this.phaserScene.scene.stop("question").wake("dhiegolevel");
    }
  }

  idleAnimation(ref, spritesheetKey) {
    ref.anims.create({
      key: "bee_idle",
      frames: ref.anims.generateFrameNumbers(spritesheetKey, {
        frames: [0, 1],
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
