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

export default class DhiegoLevel4 extends BaseLevel {
  constructor() {
    super("dhiegolevel4", true);
  }

  preload() {
    this.load.tilemapCSV("dhiegomap4", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_4.csv");
    this.load.tilemapCSV("dhiegobg4", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2_bg.csv");
  }

  create() {
    // ------------------------------------------------- //
    bg_map = this.make.tilemap({ key: "dhiegobg4", tileWidth: 16, tileHeight: 16 });
    bg_tileset = bg_map.addTilesetImage("Textures.simple");
    bg_layer = bg_map.createLayer(0, bg_tileset, 0, 0);

    map = this.make.tilemap({ key: "dhiegomap4", tileWidth: 16, tileHeight: 16 });
    tileset = map.addTilesetImage("Textures.simple");
    layer = map.createLayer(0, tileset, 0, 0);

    map.setCollisionBetween(0, 10);

    this.useGrid();

     makeLadder(this, [225, 285]);
     makeLadder(this, [234, 294]);
     makeLadder(this, [158, 218]);

    this.playerObject = new Luiz(this);
    this.playableCharacter = this.playerObject.invokePlayableCharacter();
    this.playableCharacter.setCollideWorldBounds(true);
    this.physics.add.collider(this.playableCharacter, layer);
    this.physics.add.overlap(this.playableCharacter, this.ladderGroup);
    this.customGrid.placeAtIndex(359, this.playableCharacter);

    // ------------------------------------------------- //

    // [{pos:23, enemy: Dog}, {pos:295, enemy: Dog}, {pos:216, enemy: Bee}, {pos:135, enemy: Bee}].forEach(({pos, enemy}) => {
    //   enemies_list.push(this.makeEnemy(pos, enemy));
    // });

    this.enemies_list4 = [];
    [23, 295, 216, 137].forEach((pos, index) => {
      this.enemies_list4.push(this.makeEnemy(pos, Bee));
    });

    zone = this.add.zone(0, 0).setSize(10, 10);
    this.customGrid.placeAtIndex(20, zone);
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
    zone.on("enterzone", () => this.scene.start("dhiegolevel5"));
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
    // console.log(count);
    if (count > 200) {
      count = 0;
      signal *= -1;
    }
    this.enemies_list4?.forEach((enemy) => {
      enemy.handleBeeMoves(count, signal);
      // console.log(enemy);
    });
  }
}
