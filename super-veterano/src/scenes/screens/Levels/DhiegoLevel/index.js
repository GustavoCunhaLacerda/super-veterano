import Phaser from "phaser";
import Luiz from "../../../game_objects/player/Luiz";
import Dhiego from "../../../game_objects/enemies/bosses/Dhiego";
import addUiButton from "../../../components/UiButton";

import { AlignGrid } from "../../../../utils/gridAlign";
import { game } from "../../../..";
export default class DhiegoLevel extends Phaser.Scene {
  constructor() {
    super({ key: "dhiegolevel" });
  }

  preload() {
    this.load.tilemapCSV("dhiegomap", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2.csv");
    this.load.tilemapCSV("dhiegobg", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2_bg.csv");
  }

  create() {
    this.bg_map = this.make.tilemap({ key: "dhiegobg", tileWidth: 16, tileHeight: 16 });
    this.bg_tileset = this.bg_map.addTilesetImage("Textures.simple");

    this.map = this.make.tilemap({ key: "dhiegomap", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("Textures.simple");
    this.bg_layer = this.bg_map.createLayer(0, this.tileset, 0, 0);
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);

    this.map.setCollisionBetween(0, 10);

    this.player = new Luiz(this);
    const dhiego = new Dhiego(this);

    this.player.sprite.setCollideWorldBounds(true);

    this.physics.add.collider(this.player.sprite, this.layer);
    this.physics.add.collider(dhiego.sprite, this.layer);

    this.physics.add.overlap(this.player.sprite, dhiego.sprite, () => {
      this.scene.sleep("dhiegolevel").run("question");
    });

    addUiButton(this, 300, 300, "teste questao", () => {
      this.scene.sleep("dhiegolevel").run("question");
    });

    let gridConfig = {
      scene: this,
      cols: 38,
      rows: 38,
    };
    this.aGrid = new AlignGrid(gridConfig);
    this.aGrid.show();
    this.aGrid.showNumbers();

    this.ladder = this.add.image(0, 0, "Sprites.itens.ladder");

    // this.aGrid.placeAt(2, 2, this.ladder);
    // this.ladder.displayWidth = game.config.width / 38;
    // this.ladder.scaleY = this.face.scaleX;
    this.aGrid.placeAtIndex(860, this.ladder);
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    this.player.handleGameplay();
  }
}
