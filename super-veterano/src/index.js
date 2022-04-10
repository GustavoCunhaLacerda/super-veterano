import Phaser from "phaser";
import TestSpriteAnimations from "./scenes/TestSpriteAnimations";

class Boot extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("logo", LogoImg);
  }

  create() {
    const logo = this.add.image(400, 150, "logo");

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "super-veterano",
  width: 800,
  height: 600,
  pixelArt: true,
  backgroundColor: "#242424",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [TestSpriteAnimations],
};

const game = new Phaser.Game(config);
