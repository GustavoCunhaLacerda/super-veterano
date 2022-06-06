import Phaser from "phaser";
import Luiz from "../../game_objects/player/Luiz";
import Dhiego from "../../game_objects/enemies/bosses/Dhiego";

export default class DhiegoLevel extends Phaser.Scene {
  constructor() {
    super("dhiegolevel");
  }

  preload() {
    this.load.tilemapCSV("dhiegomap", "src/scenes/DhiegoLevel/level_tileset_map.csv");
  }

  create() {
    this.add.image(304, 304, "Background.default").setScale(2);

    this.player = new Luiz(this);
    const dhiego = new Dhiego(this);

    this.map = this.make.tilemap({ key: "dhiegomap", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("Textures.default");
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.map.setCollisionBetween(549, 20000);

    this.player.sprite.setCollideWorldBounds(true);
    this.physics.add.collider(this.player.sprite, this.layer);
    this.physics.add.collider(dhiego.sprite, this.layer);

    this.physics.add.overlap(this.player.sprite, dhiego.sprite, () => {
      this.scene.start("alessandralevel");
    });
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    this.player.handleGameplay();
  }
}
