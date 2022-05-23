import Phaser from "phaser";
import Luiz from "../../game_objects/player/Luiz";
import Dhiego from "../../game_objects/enemies/bosses/Dhiego";

export default class DhiegoLevel extends Phaser.Scene {
  constructor() {
    super("dhiegolevel");
  }

  preload() {
    this.load.tilemapCSV("map", "src/scenes/DhiegoLevel/level_tileset_map.csv");
  }

  create() {
    this.add.image(304, 304, "bg").setScale(2);

    this.player = new Luiz(this);
    this.boss = new Dhiego(this);

    this.map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("textures-16");
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.map.setCollisionBetween(549, 20000);

    this.player.sprite.setCollideWorldBounds(true);
    this.physics.add.collider(this.player.sprite, this.layer);
    this.physics.add.collider(this.boss.sprite, this.layer);
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    this.player.handleGameplay();
  }
}
