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
      fontSize: "32px",
      color: "#ffffff",
    };

    // add a centered text to the scene to credit the creators Gustavo C Lacerda and João Vítor Souza Rezende
    this.add
      .text(
        300,
        300,
        "Feito por\nGustavo C Lacerda\ne\nJoão Vítor Souza Rezende",
        fontConfig
      )
      .setOrigin(0.5);

    // add a return button to main menu with text and hover effect
    const returnBtn = this.add.image(304, 454, "buttonBase").setScale(1);
    const returnBtn_text = this.add
      .text(returnBtn.x, returnBtn.y, "VOLTAR", fontConfig)
      .setOrigin(0.5);
    returnBtn.setInteractive();
    returnBtn.on("pointerover", () => {
      returnBtn.setScale(1.1);
      returnBtn_text.setScale(1.1);
    });
    returnBtn.on("pointerout", () => {
      returnBtn.setScale(1);
      returnBtn_text.setScale(1);
    });
    returnBtn.on("pointerdown", () => {
      this.scene.start("mainmenu");
    });
  }

  update() {}
}
