import Phaser from "phaser";
import { AlignGrid } from "../../../utils/gridAlign";
import Luiz from "../../game_objects/player/Luiz";

export default class Final extends Phaser.Scene {
  constructor() {
    super({ key: "final" });
  }

  preload() {
    this.load.tilemapCSV("final_map", "src/scenes/screens/Final/csv/final_map.csv");
    this.load.tilemapCSV("final_bg", "src/scenes/screens/Final/csv/final_bg.csv");
  }

  create() {
    this.board_map = this.make.tilemap({ key: "final_bg", tileWidth: 16, tileHeight: 16 });
    this.board_tileset = this.board_map.addTilesetImage("Textures.board");
    this.board_layer = this.board_map.createLayer(0, this.board_tileset, 0, 0);

    this.bg_map = this.make.tilemap({ key: "final_map", tileWidth: 16, tileHeight: 16 });
    this.bg_tileset = this.bg_map.addTilesetImage("Textures.simple");
    this.bg_layer = this.bg_map.createLayer(0, this.bg_tileset, 0, 0);

    this.bg_layer.setCollisionBetween(0, 10);

    this.customGrid = new AlignGrid({
      scene: this,
      cols: 20,
      rows: 20,
    });

    const final_text = this.add.text(0, 0, `Parabéns !\nVocê ajudou o Luiz a\nconcluir a faculdade.`, {
      fontSize: "16px",
      fill: "#000",
      align: "center",
      fontStyle: "bold",
    });
    this.customGrid.placeAtIndex(44, final_text);

    this.playerObject = new Luiz(this);
    this.playerTotem = this.playerObject.invokePlayerTotem(this, false);
    this.playerTotem.body.setAllowGravity(true);

    this.customGrid.placeAtIndex(170, this.playerTotem);
    this.customGrid.scaleToGameW(this.playerTotem, 5);

    this.physics.add.collider(this.playerTotem, this.bg_layer);
  }
}
