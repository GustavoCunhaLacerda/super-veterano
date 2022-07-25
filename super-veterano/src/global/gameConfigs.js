import constants from "./constants";
import colors from "./colors";

import scenes from "../scenes";

export default {
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
      debug: false,
    },
  },
  backgroundColor: colors.BACKGROUND_CANVA,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [...scenes],
};
