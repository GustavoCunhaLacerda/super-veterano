import Luiz from "../../../game_objects/player/Luiz";
import BaseLevel from "../BaseLevel";

import { makeLadder } from "../../../game_objects/platforms/Ladder";
import Bee from "../../../game_objects/enemies/common/bee";

let count = 0;
let signal = -1;

var touching;
var wasTouching;
export default class DhiegoLevel2 extends BaseLevel {
  constructor() {
    super("dhiegolevel2", false);
  }

  preload() {
    this.load.tilemapCSV("dhiegomap2", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_2.csv");
    this.load.tilemapCSV("dhiegobg2", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2_bg.csv");
  }

  create() {
    this.bg_map = this.make.tilemap({ key: "dhiegobg2", tileWidth: 16, tileHeight: 16 });
    this.bg_tileset = this.bg_map.addTilesetImage("Textures.simple");
    this.map = this.make.tilemap({ key: "dhiegomap2", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("Textures.simple");
    this.bg_layer = this.bg_map.createLayer(0, this.tileset, 0, 0);
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.map.setCollisionBetween(0, 10);

    this.useGrid();

    makeLadder(this, [92, 192]);
    makeLadder(this, [54, 54]);
    makeLadder(this, [37, 57]);

    this.playerObject = new Luiz(this);
    this.playableCharacter = this.playerObject.invokePlayableCharacter();
    this.playableCharacter.setCollideWorldBounds(true);
    this.physics.add.collider(this.playableCharacter, this.layer);
    this.physics.add.overlap(this.playableCharacter, this.ladderGroup);
    this.customGrid.placeAtIndex(20, this.playableCharacter);

    this.enemies_list2 = [];
    [267, 370, 321].forEach((pos) => {
      this.enemies_list2.push(this.makeEnemy(pos, Bee));
    });

    this.zone = this.add.zone(0, 0).setSize(10, 10);
    this.customGrid.placeAtIndex(379, this.zone);
    this.physics.world.enable(this.zone, 0); // (0) DYNAMIC (1) STATIC
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;
    this.physics.add.overlap(this.playableCharacter, this.zone);
    this.physics.add.collider(
      this.playableCharacter,
      this.layer,
      () => {
        console.log("enterzone");
      },
      null,
      this
    );
    this.zone.body.debugBodyColor = 0x00ffff;
    this.zone.on("enterzone", () => this.scene.start("dhiegolevel3"));
  }

  update() {
    touching = this.zone.body.touching;
    wasTouching = this.zone.body.wasTouching;

    if (touching.none && !wasTouching.none) {
      this.zone.emit("leavezone");
    } else if (!touching.none && wasTouching.none) {
      this.zone.emit("enterzone");
    }

    this.zone.body.debugBodyColor = this.zone.body.touching.none ? 0x00ffff : 0xffff00;
    this.gameplayHandler();

    count++;
    // console.log(count);
    if (count > 200) {
      count = 0;
      signal *= -1;
    }
    this.enemies_list2?.forEach((enemy) => {
      enemy.handleBeeMoves(count, signal);
      // console.log(enemy);
    });
  }
}
