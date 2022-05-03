import Phaser from "phaser";

import constants from "./global/constants";
import colors from "./global/colors";

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
  width: constants.WINDOW_WIDTH,
  height: constants.WINDOW_HEIGHT,
  physics: {
    default: constants.PHYSICS_TYPE,
    arcade: {
      gravity: {
        y: constants.GRAVITY_Y,
      },
      debug: true,
    },
  },
  backgroundColor: colors.BACKGROUND_CANVA,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Dhiego],
};

const game = new Phaser.Game(config);
