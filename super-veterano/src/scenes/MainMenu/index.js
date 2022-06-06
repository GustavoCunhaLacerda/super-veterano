import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainmenu");
  }

  preload() {}

  create() {
    this.add.image(300, 300, "Background.menu").setScale(5);

    // Start game buton
    const startGame_btn = this.add.image(304, 454, "Intrerface.button.base").setScale(1);

    // Centered text in the middle of button
    const startBtn_text = this.add
      .text(startGame_btn.x, startGame_btn.y, "INICIAR", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Set button interactivity and hover effect
    startGame_btn.setInteractive();
    startGame_btn.on("pointerover", () => {
      startGame_btn.setScale(1.1);
      startBtn_text.setScale(1.1);
    });
    startGame_btn.on("pointerout", () => {
      startGame_btn.setScale(1);
      startBtn_text.setScale(1);
    });

    // Start dhiegolevel when clicked
    startGame_btn.on("pointerdown", () => {
      this.scene.start("alessandralevel");
    });

    // Credits button equal to start button
    const credits_btn = this.add.image(304, 524, "Intrerface.button.base").setScale(1);

    // add text to credits button
    const creditsBtn_text = this.add
      .text(credits_btn.x, credits_btn.y, "CREDITOS", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Set button interactivity and hover effect
    credits_btn.setInteractive();
    credits_btn.on("pointerover", () => {
      credits_btn.setScale(1.1);
      creditsBtn_text.setScale(1.1);
    });
    credits_btn.on("pointerout", () => {
      credits_btn.setScale(1);
      creditsBtn_text.setScale(1);
    });

    // Start credits scene when clicked
    credits_btn.on("pointerdown", () => {
      this.scene.start("credits");
    });
  }
}
