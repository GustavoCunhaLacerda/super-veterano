import Phaser from "phaser";

const initialHistory = ["Era uma vez um garoto cahamado 'Luiz'.", "Ele era um estudante de Computação\ndo Instituto Federal de Brasília\nque passava por um grande problema \nem sua carreira acadêmica.", "Ele era terrível na arte de somar!\n\n1+1 = 3 ???\nPara ele isso fazia sentido."];
let index = 0;

export default class TextHitory extends Phaser.Scene {
  constructor() {
    super("texthistory");
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    const hist = this.add
      .text(300, 300, "...", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.input.on("pointerdown", () => {
      updateText(this, hist);
    });
  }

  update() {}
}

function updateText(phaserScene, hist) {
  if (index < initialHistory.length) {
    hist.setText(initialHistory[index]);
    index++;
  } else {
    phaserScene.scene.start("dhiegolevel");
  }
}
