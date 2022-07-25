import Phaser from "phaser";

const initialHistory = ["Era uma vez um garoto chamado 'Luiz'.",
"Ele era um estudante de Computação\ndo Instituto Federal de Brasília\nque passava por um terrível problema \nem sua carreira acadêmica.", 
"Ele era terrível em matemática \ne já não sabia o que fazer\npensou até em trancar o curso \npor causa desse problema.",
"Mas, como um super veterano\n ele tinha que dá um exemplo \nao seus calouros enfrentar o \nseu grande medo.",
"O Rei da integral dupla\n Seu grande professor\n Dhiego. ",
"Para ajudar ele nessa \nlinda jornada ele pensou em \ncriar um jogo para ajudar a estudar.  ",
"Com isso, apresentamos\n Super Veterano.  ",
];
let index = 0;

export default class TextHitory extends Phaser.Scene {
  constructor() {
    super("texthistory");
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    const hist = this.add
      .text(160, 160, "...", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "16px",
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
