import Luiz from "../../../game_objects/player/Luiz";
import BaseLevel from "../BaseLevel";

import Dhiego from "../../../game_objects/enemies/bosses/Dhiego";

import { makeLadder } from "../../../game_objects/platforms/Ladder";
import Bee from "../../../game_objects/enemies/common/bee";

let count = 0;
let signal = -1;

var touching;
var wasTouching;

export default class DhiegoLevel3 extends BaseLevel {
  constructor() {
    super("dhiegolevel3", false);
  }

  preload() {
    this.load.tilemapCSV("dhiegomap3", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_3.csv");
    this.load.tilemapCSV("dhiegobg3", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2_bg.csv");
  }

  create() {
    this.bg_map = this.make.tilemap({ key: "dhiegobg3", tileWidth: 16, tileHeight: 16 });
    this.bg_tileset = this.bg_map.addTilesetImage("Textures.simple");
    this.map = this.make.tilemap({ key: "dhiegomap3", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("Textures.simple");
    this.bg_layer = this.bg_map.createLayer(0, this.tileset, 0, 0);
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.map.setCollisionBetween(0, 10);

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
    this.physics.add.collider(this.playableCharacter, this.layer);
    this.physics.add.overlap(this.playableCharacter, this.ladderGroup);
    this.customGrid.placeAtIndex(359, this.playableCharacter);

    this.enemies_list3 = [];
    [276, 196, 189].forEach((pos, index) => {
      this.enemies_list3.push(this.makeEnemy(pos, Bee));
    });

    const deego = new Dhiego(this);
    this.customGrid.placeAtIndex(49, deego.sprite);
    this.customGrid.scaleToGameW(deego.sprite, 2.5);
    this.physics.add.collider(deego.sprite, this.layer);
  }

  update() {
    // touching = this.zone.body.touching;
    // wasTouching = this.zone.body.wasTouching;
    
    this.gameplayHandler();
    count++;
    console.log(count);
    if (count > 200) {
      count = 0;
      signal *= -1;
    }
    this.enemies_list3?.forEach((enemy) => {
      enemy.handleBeeMoves(count, signal);
      console.log(enemy);
    });
  }
}
