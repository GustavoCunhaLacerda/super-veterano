import Phaser from "phaser";
import addUiButton from "../../components/UiButton";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    // add gameover text
    const gameOverText = this.add
      .text(160, 160, "LUIZ FOI JUBILADO", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "16px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
  }

  update() {}
}
