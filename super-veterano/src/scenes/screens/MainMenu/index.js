import Phaser from "phaser";
import addUiButton from "../../components/UiButton";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainmenu");
  }

  preload() {}

  create() {
    this.add.image(300, 300, "Background.menu").setScale(5);

    addUiButton(this, 304, 454, "INICIAR", () => {
      this.scene.start("dhiegolevel");
      // this.scene.launch("question");
    });

    addUiButton(this, 304, 524, "CRÉDITOS", () => {
      this.scene.start("credits");
    });
  }
}
