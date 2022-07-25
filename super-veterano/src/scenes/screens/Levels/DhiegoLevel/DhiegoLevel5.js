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
    super("dhiegolevel5", true);
  }

  preload() {
    this.load.tilemapCSV("dhiegomap5", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_5.csv");
    this.load.tilemapCSV("dhiegobg5", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2_bg.csv");
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

    // [{pos:265, enemy: Dog}, {pos:274, enemy: Dog}, {pos:367, enemy: Bee}].forEach(({pos, enemy}) => {
    //   enemies_list.push(this.makeEnemy(pos, enemy));
    // });

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
    zone.on("enterzone", () => this.scene.start("dhiegolevel6"));
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
    enemies_list.forEach((enemy) => {

      // enemy.handleBeeMoves(count, signal);
    });
  }
}