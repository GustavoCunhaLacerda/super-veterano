export default class Dog {
  constructor(phaserScene) {
    this.name = "Dog";
    this.lifePoints = 2;
    this.phaserScene = phaserScene;
    this.body = null;

    this.idleAnimation(phaserScene, "Sprites.enemies.dog.idle");
  }

  invokeEnemyCharacter() {
    const sprite = this.phaserScene.physics.add.sprite(0, 0, "Sprites.enemies.dog.idle");
    sprite.anims.play("dog_idle", true);
    sprite.body.setAllowGravity(false);

    this.body = sprite;

    return sprite;
  }

  handleDogMoves(countAux, signal) {
      this.body.flipX = signal == 1 ? true : false;
      try {
        this.body.setVelocityX(10 * signal);
      } catch (error) {
        console.log("erro no movimento do dog");
      }
  }

  invokeEnemyTotem(phaserScene) {
    const totem = phaserScene.physics.add.sprite(0, 0, "Sprites.enemies.dog.idle");
    totem.anims.play("dog_idle", true);
    totem.body.setAllowGravity(false);

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
      this.phaserScene.scene.stop("question").wake("dhiegolevel");
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
