import Phaser from "phaser";

import Luiz from "../../assets/animations/_side_walk.png";
import Ground from "../../assets/platforms/platform.png";

export default class Dhiego extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet("luiz", Luiz, { frameWidth: 64, frameHeight: 64 });
    this.load.image("ground", Ground);
  }

  create() {
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("luiz", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("luiz", {
        frames: [1],
      }),
      frameRate: 8,
      repeat: -1,
    });

    const keys = ["walk", "idle"];

    this.player = this.physics.add
      .sprite(400, 400)
      .setSize(32, 30)
      .setOffset(16, 16);

    this.player.setScale(3);

    this.physics.add.collider(this.player, platforms);
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();

    // andar e parar
    if (cursors.left.isDown) {
      this.movePlayer("R");
    } else if (cursors.right.isDown) {
      this.movePlayer("L");
    } else {
      this.pausePlayer();
    }

    // pular
    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }
  }

  pausePlayer() {
    this.player.setVelocityX(0);
    this.player.anims.play("idle");
  }

  movePlayer(SENSE) {
    const signal = SENSE == "R" ? -1 : 1;
    const speed = 160;
    this.player.setVelocityX(speed * signal);
    this.player.anims.play("walk", true);
    this.player.flipX = SENSE == "R" ? false : true;
  }
}
