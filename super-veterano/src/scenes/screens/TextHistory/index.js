import Phaser from "phaser";

export default class TextHitory extends Phaser.Scene {
  constructor() {
    super("texthistory");
  }

  preload() {}

  create() {
    //change the background to black
    this.cameras.main.setBackgroundColor("#000000");

    // create a shor history to our character
    let hist = this.add
      .text(300, 300, "Era uma vez a hitória do Luiz, \num garoto péssimo em tudo. \n\nPrincipalmente na arte de somar.", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // on screen click, add another text to the history and delete the other
    this.input.on("pointerdown", () => {
      hist.destroy();
      hist = this.add
        .text(300, 300, "Ele curtia um veveco maneiro e pintudo.", {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "32px",
          color: "#ffffff",
        })
        .setOrigin(0.5);
      this.input.on("pointerdown", () => {
        //move to dhiegolevel
        this.scene.start("dhiegolevel");
      });
    });
  }
}
