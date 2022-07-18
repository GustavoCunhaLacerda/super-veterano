import Luiz from "../../../game_objects/player/Luiz";
import BaseLevel from "../BaseLevel";

import Dhiego from "../../../game_objects/enemies/bosses/Dhiego";

import { makeLadder } from "../../../game_objects/platforms/Ladder";
import Bee from "../../../game_objects/enemies/common/bee";

export default class DhiegoLevel3 extends BaseLevel {
  constructor() {
    super("dhiegolevel3", true);
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

    [276, 196, 189].forEach((pos) => {
      this.makeEnemy(pos, Bee);
    });

    const deego = new Dhiego(this);
    this.customGrid.placeAtIndex(49, deego.sprite);
    this.customGrid.scaleToGameW(deego.sprite, 2.5);
    this.physics.add.collider(deego.sprite, this.layer);
    // this.zone = this.add.zone(0, 0).setSize(10, 10);
    // this.customGrid.placeAtIndex(379, this.zone);
    // this.physics.world.enable(this.zone, 0); // (0) DYNAMIC (1) STATIC
    // this.zone.body.setAllowGravity(false);
    // this.zone.body.moves = false;
    // this.physics.add.overlap(this.playableCharacter, this.zone);
    // this.physics.add.collider(
    //   this.playableCharacter,
    //   this.layer,
    //   () => {
    //     console.log("enterzone");
    //   },
    //   null,
    //   this
    // );
    // this.zone.body.debugBodyColor = 0x00ffff;
    // this.zone.on("enterzone", () => this.scene.start("mainmenu"));
  }

  update() {
    // var touching = this.zone.body.touching;
    // var wasTouching = this.zone.body.wasTouching;

    // if (touching.none && !wasTouching.none) {
    //   this.zone.emit("leavezone");
    // } else if (!touching.none && wasTouching.none) {
    //   this.zone.emit("enterzone");
    // }

    // this.zone.body.debugBodyColor = this.zone.body.touching.none ? 0x00ffff : 0xffff00;
    this.gameplayHandler();
  }
}
