import Phaser from "phaser";
import addControlKeys from "../../gameplay/addControlKeys";

import Ground from "../../assets/platforms/platform.png";

import luiz_idle from "../../assets/animations/luiz/luiz_idle-Sheet.png";
import luiz_walk from "../../assets/animations/luiz/luiz_walk-Sheet.png";
import luiz_jump from "../../assets/animations/luiz/luiz_jump.png";
import playerControls from "../../gameplay/playerControls";
import playerAnimations from "../../animations/playerAnimations";

export default class Dhiego extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet("luiz_walk", luiz_walk, { frameWidth: 23, frameHeight: 23 });
    this.load.spritesheet("luiz_idle", luiz_idle, { frameWidth: 23, frameHeight: 23 });
    this.load.spritesheet("luiz_jump", luiz_jump, { frameWidth: 23, frameHeight: 23 });
    this.load.image("ground", Ground);
  }

  create() {
    addControlKeys(this);

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    playerAnimations.idleAnimation(this);
    playerAnimations.walkAnimation(this);
    playerAnimations.jumpAnimation(this);

    this.player = this.physics.add
      .sprite(400, 400)
      .setSize(10, 15)
      .setOffset(6, 8);

    this.player.setScale(3);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platforms);
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    playerControls.walk(this);
    playerControls.jump(this);
  }
}
