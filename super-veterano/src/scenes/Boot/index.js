import Textures16 from "../../assets/tiles/Textures-16.png";
import bg from "../../assets/backgrounds/leveld_Bg.jpg";
import IFBEntrance from "../../assets/backgrounds/fachada-ifb.png";

import luizAnims from "../../game_objects/player/Luiz/assets/animations";
import dhiegoAnims from "../../game_objects/enemies/bosses/Dhiego/animations";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload() {
    this.load.image("bg", bg);
    this.load.image("textures-16", Textures16);
    this.load.image("ifbEntrance", IFBEntrance);

    // ------------------------------ Player ------------------------------ //
    this.load.spritesheet("luiz_idle", luizAnims.luiz_idle, {
      frameWidth: 23,
      frameHeight: 23,
    });
    this.load.spritesheet("luiz_walk", luizAnims.luiz_walk, {
      frameWidth: 23,
      frameHeight: 23,
    });
    this.load.spritesheet("luiz_jump", luizAnims.luiz_jump, {
      frameWidth: 23,
      frameHeight: 23,
    });

    // ---------------------------- Boss (Dhiego) --------------------------- //
    this.load.spritesheet("dhiego_writing", dhiegoAnims.dhiego_writing, {
      frameWidth: 42,
      frameHeight: 48,
    });

    this.load.on("complete", () => {
      console.log("carregou tudinho");
      this.scene.start("mainmenu");
      console.log("passou para o menu");
    });
  }

  create() {}

  update() {}
}
