import Phaser from "phaser";
import Alessandra from "../../game_objects/enemies/bosses/Alessandra";
import Luiz from "../../game_objects/player/Luiz";

export default class AlessandraLevel extends Phaser.Scene {
  constructor() {
    super("alessandralevel");
  }

  preload() {
    // load level
    this.load.tilemapCSV(
      "map",
      "src/scenes/AlessandraLevel/level_tileset_map.csv"
    );
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });
    const tileset = map.addTilesetImage("Textures.default");
    const layer = map.createLayer(0, tileset, 0, 0);
    map.setCollisionBetween(684, 700);
    map.setCollisionBetween(1000, 1007);

    this.player = new Luiz(this);
    const boss = new Alessandra(this);

    this.player.sprite.setCollideWorldBounds(true);
    this.physics.add.collider(this.player.sprite, layer);
    this.physics.add.collider(boss.sprite, layer);

    this.physics.add.overlap(this.player.sprite, boss.sprite, () => {
      this.scene.start("dhiegolevel");
    });
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    this.player.handleGameplay();
  }
}
