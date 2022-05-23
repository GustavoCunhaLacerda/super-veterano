import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainmenu");
  }

  preload() {}

  create() {
    this.input.on(
      "pointerup",
      function (pointer) {
        this.scene.start("dhiegolevel");
      },
      this
    );
    this.add.image(300, 300, "ifbEntrance").setScale(5);
  }
}
