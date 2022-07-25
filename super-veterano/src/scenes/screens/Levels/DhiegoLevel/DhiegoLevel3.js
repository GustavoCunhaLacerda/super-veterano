import Luiz from "../../../game_objects/player/Luiz";
import BaseLevel from "../BaseLevel";

import { makeLadder } from "../../../game_objects/platforms/Ladder";
import Bee from "../../../game_objects/enemies/common/bee";
import Dog from "../../../game_objects/enemies/common/dog";

let count = 0;
let signal = -1;

var touching;
var wasTouching;

let bg_map;
let bg_tileset;
let map;
let tileset;
let bg_layer;
let layer;

let enemies_list = [];
let zone;

export default class DhiegoLevel5 extends BaseLevel {
  constructor() {
    super("dhiegolevel3", false);
  }

  preload() {
    this.load.tilemapCSV("dhiegomap5", "src/scenes/screens/Levels/DhiegoLevel/csv/dhiego_level_5.csv");
    this.load.tilemapCSV("dhiegobg5", "src/scenes/screens/Levels/DhiegoLevel/csv/dhiego_level_v2_bg.csv");
  }

  create() {
    // ------------------------------------------------- //
    bg_map = this.make.tilemap({ key: "dhiegobg5", tileWidth: 16, tileHeight: 16 });
    bg_tileset = bg_map.addTilesetImage("Textures.simple");
    bg_layer = bg_map.createLayer(0, bg_tileset, 0, 0);

    map = this.make.tilemap({ key: "dhiegomap5", tileWidth: 16, tileHeight: 16 });
    tileset = map.addTilesetImage("Textures.simple");
    layer = map.createLayer(0, tileset, 0, 0);

    map.setCollisionBetween(0, 10);

    this.useGrid();

    makeLadder(this, [238, 228]);
    makeLadder(this, [221, 281]);
    makeLadder(this, [156, 216]);
    makeLadder(this, [61, 121]);

    this.playerObject = new Luiz(this);
    this.playableCharacter = this.playerObject.invokePlayableCharacter();
    this.playableCharacter.setCollideWorldBounds(true);
    this.physics.add.collider(this.playableCharacter, layer);
    this.physics.add.overlap(this.playableCharacter, this.ladderGroup);
    this.customGrid.placeAtIndex(359, this.playableCharacter);

    // ------------------------------------------------- //

    [
      { pos: 43, enemy: Bee, scale: 0.5 },
      { pos: 205, enemy: Bee, scale: 0.5 },
      { pos: 137, enemy: Bee, scale: 0.5 },
      { pos: 52, enemy: Dog, scale: 1 },
      { pos: 216, enemy: Dog, scale: 1 },
    ].forEach(({ pos, enemy, scale }) => {
      enemies_list.push(this.makeEnemy(pos, enemy, scale, layer));
    });

    zone = this.add.zone(0, 0).setSize(10, 10);
    this.customGrid.placeAtIndex(39, zone);
    this.physics.world.enable(zone, 0);
    zone.body.setAllowGravity(false);
    zone.body.moves = false;
    // this.customGrid.placeAtIndex(372, zone);
    this.physics.add.overlap(this.playableCharacter, zone);
    this.physics.add.collider(
      this.playableCharacter,
      layer,
      () => {
        console.log("enterzone");
      },
      null,
      this
    );
    zone.body.debugBodyColor = 0x00ffff;
    zone.on("enterzone", () => this.scene.start("dhiegolevel4"));
  }

  update() {
    touching = zone.body.touching;
    wasTouching = zone.body.wasTouching;

    if (!touching.none && wasTouching.none) {
      zone.emit("enterzone");
    }

    zone.body.debugBodyColor = zone.body.touching.none ? 0x00ffff : 0xffff00;
    this.gameplayHandler();

    count++;
    if (count > 200) {
      count = 0;
      signal *= -1;
    }
    enemies_list.forEach((enemy) => {
      enemy.handleMoves?.(count, signal);
    });
  }
}
