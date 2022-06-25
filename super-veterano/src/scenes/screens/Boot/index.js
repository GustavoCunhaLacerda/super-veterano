import Textures16 from "../../../assets/tiles/Textures-16.png";
import bg from "../../../assets/backgrounds/leveld_Bg.jpg";
import IFBEntrance from "../../../assets/backgrounds/fachada-ifb-2.png";
import loadingSprite from "../../../assets/ui/wenrexa/Progress03.png";
import buttonBase from "../../../assets/ui/wenrexa/Button18.png";
import logoTitle from "../../../assets/ui/logo-title.png";
import logoSubtitle from "../../../assets/ui/logo-subtitle.png";

import luizAnims from "../../game_objects/player/Luiz/assets/animations";
import dhiegoAnims from "../../game_objects/enemies/bosses/Dhiego/animations";
import alessandraAnims from "../../game_objects/enemies/bosses/Alessandra/animations";

import ladder from "../../../assets/itens/mine_ladder.png";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload() {
    this.load.image("Background.default", bg);
    this.load.image("Textures.default", Textures16);
    this.load.image("Background.menu", IFBEntrance);
    this.load.image("Interface.button.base", buttonBase);
    this.load.image("Interface.logo.title", logoTitle);
    this.load.image("Interface.logo.subtitle", logoSubtitle);

    this.load.spritesheet("Sprites.player.luiz.idle", luizAnims.luiz_idle, { frameWidth: 23, frameHeight: 23 });
    this.load.spritesheet("Sprites.player.luiz.walk", luizAnims.luiz_walk, { frameWidth: 23, frameHeight: 23 });
    this.load.spritesheet("Sprites.player.luiz.jump", luizAnims.luiz_jump, { frameWidth: 23, frameHeight: 23 });
    this.load.spritesheet("Sprites.enemies.dhiego.writing", dhiegoAnims.dhiego_writing, { frameWidth: 42, frameHeight: 48 });
    this.load.spritesheet("Sprites.enemies.alessandra.writing", alessandraAnims.alessandra_writing, { frameWidth: 42, frameHeight: 48 });

    this.load.image("Sprites.itens.ladder", ladder);

    this.load.image("loading", loadingSprite);

    // ref: https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.on("progress", function (value) {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("complete", () => {
      this.scene.start("mainmenu");
    });
  }

  create() {}

  update() {}
}
