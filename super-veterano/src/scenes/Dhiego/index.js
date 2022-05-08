import Phaser from "phaser";
import addControlKeys from "../../gameplay/addControlKeys";

import Ground from "../../assets/platforms/platform.png";
import PlatformAngled from "../../assets/platforms/platform-angled.png";

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
    this.load.image("ground_2", Ground);
    this.load.image("ground_3", Ground);
  }

  create() {
    addControlKeys(this);

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 800, "ground").setScale(2).refreshBody();
    platforms.create(200, 600, "ground").setScale(1).refreshBody();
    platforms.create(600, 400, "ground_2").setScale(1).refreshBody();
    platforms.create(200, 200, "ground_3").setScale(1).refreshBody();

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
