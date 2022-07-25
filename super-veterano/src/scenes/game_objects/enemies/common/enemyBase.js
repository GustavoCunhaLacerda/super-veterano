export default class Dog {
  constructor(phaserScene, name, code, lifePoints, spritesheetKey, animationFrames) {
    this.code = code;
    this.name = name;
    this.lifePoints = lifePoints;
    this.phaserScene = phaserScene;
    this.body = null;
    this.spritesheetKey = spritesheetKey;

    this.idleAnimation(phaserScene, spritesheetKey);
  }

  invokeEnemyCharacter() {
    const sprite = this.phaserScene.physics.add.sprite(0, 0, this.spritesheetKey);
    sprite.anims.play(`${this.code}_idle`, true);
    sprite.body.setAllowGravity(false);

    this.body = sprite;

    return sprite;
  }

  invokeEnemyTotem(phaserScene) {
    const totem = phaserScene.physics.add.sprite(0, 0, this.spritesheetKey);
    totem.anims.play("dog_idle", true);
    totem.body.setAllowGravity(false);

    totem.type = "dog";

    this.name = phaserScene.add.text(0, 0, `Subtracão`, {
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
      this.phaserScene.scene.stop("question").wake(this.phaserScene.key);
    }
  }

  idleAnimation(ref, spritesheetKey) {
    ref.anims.create({
      key: "dog_idle",
      frames: ref.anims.generateFrameNumbers(spritesheetKey, {
        frames: [0, 1, 2],
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
