import Phaser from "phaser";
import addControlKeys from "../../gameplay/addControlKeys";

import Luiz from "../../assets/animations/_side_walk.png";
import Ground from "../../assets/platforms/platform.png";
import playerControls from "../../gameplay/playerControls";
import playerAnimations from "../../animations/playerAnimations";

export default class Dhiego extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet("luiz", Luiz, { frameWidth: 64, frameHeight: 64 });
    this.load.image("ground", Ground);
  }

  create() {
    addControlKeys(this);

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    playerAnimations.idleAnimation(this);
    playerAnimations.walkAnimation(this);

    this.player = this.physics.add
      .sprite(400, 400)
      .setSize(32, 30)
      .setOffset(16, 16);

    this.player.setScale(3);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platforms);
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    playerControls.walk(this);
    playerControls.jump(this);
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
