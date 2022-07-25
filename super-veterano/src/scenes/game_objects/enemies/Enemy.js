import Luiz from "../player/Luiz";

export default class Enemy {
  constructor(phaserScene, name, code, lifePoints, spritesheetKey, flip, frames) {
    this.code = code;
    this.name = name;
    this.lifePoints = lifePoints;
    this.phaserScene = phaserScene;
    this.body = null;
    this.spritesheetKey = spritesheetKey;
    this.flip = flip;
    this.frames = frames;
    this.totalLifePoints = lifePoints;

    this.idleAnimation(phaserScene, spritesheetKey);
  }

  invokeEnemyCharacter(gravity = false) {
    const sprite = this.phaserScene.physics.add.sprite(0, 0, this.spritesheetKey);
    sprite.anims.play(`${this.code}_idle`, true);
    sprite.body.setAllowGravity(gravity);
    this.body = sprite;

    if (this.code === "dog") {
      const rnd = Math.floor(Math.random() * 2);
      this.body.flipX = rnd % 2 == 0 ? true : false;
    }

    return sprite;
  }

  invokeEnemyTotem(phaserScene) {
    const totem = phaserScene.physics.add.sprite(0, 0, this.spritesheetKey);
    totem.anims.play(`${this.code}_idle`, true);
    totem.body.setAllowGravity(false);

    totem.type = this.code;

    if (this.code === "dog") {
      totem.flipX = true;
    }

    this.name = phaserScene.add.text(0, 0, this.name, {
      fontSize: "16px",
      fill: "#000",
      align: "center",
    });

    this.lifePointsText = phaserScene.add.text(0, 0, `${this.lifePoints}/${this.totalLifePoints}`, {
      fontSize: "16px",
      fill: "#000",
      align: "center",
    });

    this.phaserScene.customGrid.placeAtIndex(14, this.name);
    this.phaserScene.customGrid.placeAtIndex(34, this.lifePointsText);

    return totem;
  }

  damage(damage) {
    this.lifePoints -= damage;
    this.lifePointsText.setText(`${this.lifePoints}/${this.totalLifePoints}`);

    if (this.lifePoints <= 0) {
      this.body.destroy();
      this.phaserScene.scene.stop("question").wake(this.phaserScene.key);
      Luiz.lifePoints++;
    }
  }

  idleAnimation(ref, spritesheetKey) {
    ref.anims.create({
      key: `${this.code}_idle`,
      frames: ref.anims.generateFrameNumbers(spritesheetKey, {
        frames: this.frames,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
