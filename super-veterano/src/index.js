import Phaser from "phaser";
import Dhiego from "./scenes/Dhiego";

class Boot extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {}

  create() {}

  update() {}
}

const config = {
  type: Phaser.AUTO,
  parent: "super-veterano",
  pixelArt: true,
  width: 800,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300,
      },
      debug: true,
    },
  },
  backgroundColor: "#f9f9f9",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Dhiego],
};

const game = new Phaser.Game(config);
