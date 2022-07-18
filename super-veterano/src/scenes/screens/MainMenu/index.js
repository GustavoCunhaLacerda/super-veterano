import Phaser from "phaser";
import constants from "../../../global/constants";
import addUiButton from "../../components/UiButton";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainmenu");
  }

  preload() {}

  create() {
    this.add.image(constants.WINDOW_HEIGHT / 2, constants.WINDOW_HEIGHT / 2, "Background.menu").setScale(2.5);

    addUiButton(this, constants.WINDOW_HEIGHT / 2, 50 + constants.WINDOW_HEIGHT / 2, "INICIAR", () => {
      // this.scene.start("texthistory");
      this.scene.start("dhiegolevel3");
    });

    addUiButton(this, constants.WINDOW_HEIGHT / 2, 100 + constants.WINDOW_HEIGHT / 2, "CRÉDITOS", () => {
      this.scene.start("credits");
    });
  }
}
