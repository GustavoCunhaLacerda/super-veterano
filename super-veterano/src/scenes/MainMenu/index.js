import Phaser from "phaser";

import IFBEntrance from "../../assets/backgrounds/fachada-ifb.png";
import gameLogo from "../../assets/logo.png";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainmenu");
  }

  preload() {
    this.load.image("ifbEntrance", IFBEntrance);
    // this.load.image("gameLogo", gameLogo);
  }

  create() {
    this.input.on(
      "pointerup",
      function (pointer) {
        this.scene.start("dhiegolevel");
      },
      this
    );

    this.add.image(300, 300, "ifbEntrance").setScale(5);
    // this.add.image(400, 400, "gameLogo").setScale(5);
  }

  update() {}
}
