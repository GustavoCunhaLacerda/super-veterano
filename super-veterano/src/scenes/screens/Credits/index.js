// Credits scene
// Language: javascript

export default class Credits extends Phaser.Scene {
  constructor() {
    super("credits");
  }

  preload() {}

  create() {
    // change the background for this scene to black
    this.cameras.main.setBackgroundColor("#000000");

    // create a font config object
    const fontConfig = {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "16px",
      color: "#ffffff",
    };

    // add a centered text to the scene to credit the creators Gustavo C Lacerda and João Vítor Souza Rezende
<<<<<<< Updated upstream
    this.add
      .text(
        150,
        150,
        "Feito por\n\nGustavo C Lacerda\nJoão Vítor Souza Rezende",
        fontConfig
      )
      .setOrigin(0.5);
=======
    this.add.text(160, 160, "Feito por\n\nGustavo C Lacerda\nJoão Vítor Souza Rezende", fontConfig).setOrigin(0.5);
>>>>>>> Stashed changes

    // add a return button to main menu with text and hover effect
    const returnBtn = this.add.image(160, 280, "Interface.button.base").setScale(0.5);
    const returnBtn_text = this.add.text(returnBtn.x, returnBtn.y, "VOLTAR", fontConfig).setOrigin(0.5);
    returnBtn.setInteractive();
    returnBtn.on("pointerover", () => {
      returnBtn.setScale(0.6);
      returnBtn_text.setScale(1.1);
    });
    returnBtn.on("pointerout", () => {
      returnBtn.setScale(0.5);
      returnBtn_text.setScale(1);
    });
    returnBtn.on("pointerdown", () => {
      this.scene.start("mainmenu");
    });
  }

  update() {}
}
