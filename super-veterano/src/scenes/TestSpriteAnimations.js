import Phaser from "phaser";
import AdventurerSheet from "../assets/animations/adventurer-Sheet.png";
import Brawler from "../assets/animations/brawler48x48.png";
import LogoImg from "../assets/logo.png";

export default class TestSpriteAnimations extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    // this.load.image("logo", LogoImg);
    this.load.spritesheet("adventurer-sheet", AdventurerSheet, {
      frameWidth: 50,
      frameHeight: 37,
    });
  }

  create() {
    // const logo = this.add.image(400, 150, "logo");

    this.add.image(0, 0, "adventurer-sheet", "__BASE").setOrigin(0, 0);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("adventurer-sheet", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("adventurer-sheet", {
        frames: [4, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    const cody = this.add.sprite(600, 370);
    cody.setScale(8);
    cody.play("down");
  }
}
