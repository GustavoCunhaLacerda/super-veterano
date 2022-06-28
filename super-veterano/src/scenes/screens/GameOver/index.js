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
      .text(300, 300, "Game Over", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    addUiButton(this, 304, 454, "REINICIAR", () => {
      this.scene.start("mainmenu");
    });
  }

  update() {}
}
