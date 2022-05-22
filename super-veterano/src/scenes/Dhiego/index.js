import Phaser from "phaser";
import addControlKeys from "../../gameplay/addControlKeys";

import Textures16 from "../../assets/tiles/Textures-16.png";
import bg from "../../assets/backgrounds/leveld_Bg.jpg";

import luiz_idle from "../../assets/animations/luiz/luiz_idle-Sheet.png";
import luiz_walk from "../../assets/animations/luiz/luiz_walk-Sheet.png";
import luiz_jump from "../../assets/animations/luiz/luiz_jump.png";

import dhiego_writing from "../../assets/animations/dhiego/dhiego_writing-Sheet.png";

import playerControls from "../../gameplay/playerControls";
import playerAnimations from "../../animations/playerAnimations";

import dhiegoAnimations from "../../animations/dhiegoAnimations";

export default class Dhiego extends Phaser.Scene {
  constructor() {
    super("dhiegolevel");
  }

  preload() {
    this.load.image("bg", bg);

    this.load.spritesheet("luiz_idle", luiz_idle, {
      frameWidth: 23,
      frameHeight: 23,
    });
    this.load.spritesheet("luiz_walk", luiz_walk, {
      frameWidth: 23,
      frameHeight: 23,
    });
    this.load.spritesheet("luiz_jump", luiz_jump, {
      frameWidth: 23,
      frameHeight: 23,
    });

    this.load.spritesheet("dhiego_writing", dhiego_writing, {
      frameWidth: 42,
      frameHeight: 48,
    });

    this.load.image("textures-16", Textures16);

    this.load.tilemapCSV("map", "src/scenes/Dhiego/level_tileset_map.csv");
  }

  create() {
    this.add.image(304, 304, "bg").setScale(2);

    addControlKeys(this);
    playerAnimations.idleAnimation(this, "luiz_idle");
    playerAnimations.walkAnimation(this, "luiz_walk");
    playerAnimations.jumpAnimation(this, "luiz_jump");

    dhiegoAnimations.walkAnimation(this, "dhiego_writing");

    this.player = this.physics.add
      .sprite(400, 400)
      .setSize(10, 15)
      .setOffset(6, 8)
      .setScale(2.5);

    this.boss = this.physics.add
      .sprite(304, 9 * 12)
      .setSize(42, 48)
      .setOffset(0, 0)
      .setScale(2)
      .anims.play("writing", true);

    this.map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("textures-16");
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.map.setCollisionBetween(549, 20000);

    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.boss, this.layer);
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();

    playerControls.walk(this);
    playerControls.jump(this);
  }
}
