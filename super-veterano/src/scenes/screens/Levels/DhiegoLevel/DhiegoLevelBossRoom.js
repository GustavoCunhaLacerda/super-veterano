import Luiz from "../../../game_objects/player/Luiz";
import BaseLevel from "../BaseLevel";

import Dhiego from "../../../game_objects/enemies/bosses/Dhiego";

import { makeLadder } from "../../../game_objects/platforms/Ladder";
import Bee from "../../../game_objects/enemies/common/bee";
import Sigma from "../../../game_objects/enemies/common/sigma";

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

export default class DhiegoLevelBossRoom extends BaseLevel {
  constructor() {
    super("dhiegolevel_boss_room", false);
  }

  preload() {
    this.load.tilemapCSV("dhiegomap_boss", "src/scenes/screens/Levels/DhiegoLevel/csv/dhiego_level_3.csv");
    this.load.tilemapCSV("dhiegobg_boss", "src/scenes/screens/Levels/DhiegoLevel/csv/dhiego_level_v2_bg.csv");
  }

  create() {
    bg_map = this.make.tilemap({ key: "dhiegobg_boss", tileWidth: 16, tileHeight: 16 });
    bg_tileset = bg_map.addTilesetImage("Textures.simple");
    bg_layer = bg_map.createLayer(0, bg_tileset, 0, 0);

    map = this.make.tilemap({ key: "dhiegomap_boss", tileWidth: 16, tileHeight: 16 });
    tileset = map.addTilesetImage("Textures.simple");
    layer = map.createLayer(0, tileset, 0, 0);

    map.setCollisionBetween(0, 10);

    this.useGrid();

    makeLadder(this, [94, 194]);
    makeLadder(this, [85, 185]);
    makeLadder(this, [201, 261]);
    makeLadder(this, [218, 278]);
    makeLadder(this, [285, 345]);
    makeLadder(this, [294, 354]);

    this.playerObject = new Luiz(this);
    this.playableCharacter = this.playerObject.invokePlayableCharacter();
    this.playableCharacter.setCollideWorldBounds(true);
    this.physics.add.collider(this.playableCharacter, layer);
    this.physics.add.overlap(this.playableCharacter, this.ladderGroup);
    this.customGrid.placeAtIndex(359, this.playableCharacter);

    [
      { pos: 276, enemy: Sigma, scale: 1 },
      { pos: 196, enemy: Sigma, scale: 0.5 },
      { pos: 189, enemy: Sigma, scale: 0.5 },
      { pos: 29, enemy: Dhiego, scale: 3 },
    ].forEach(({ pos, enemy, scale }) => {
      enemies_list.push(this.makeEnemy(pos, enemy, scale, layer));
    });
  }

  update() {
    this.gameplayHandler();
    count++;
    if (count > 200) {
      count = 0;
      signal *= -1;
    }
    enemies_list?.forEach((enemy) => {
      enemy.handleMoves?.(count, signal);
    });
  }
}
