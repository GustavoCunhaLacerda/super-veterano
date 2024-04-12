import Phaser from "phaser";
import Luiz from "../../../game_objects/player/Luiz";
import Dhiego from "../../../game_objects/enemies/bosses/Dhiego";
import addUiButton from "../../../components/UiButton";

import { AlignGrid } from "../../../../utils/gridAlign";
import { game } from "../../../..";
import { makeLadder } from "../../../game_objects/platforms/Ladder";
import Bee from "../../../game_objects/enemies/common/bee";
export default class DhiegoLevel extends Phaser.Scene {
  constructor() {
    super({ key: "dhiegolevel" });
  }

  preload() {
    this.load.tilemapCSV("dhiegomap", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2.csv");
    this.load.tilemapCSV("dhiegobg", "src/scenes/screens/Levels/DhiegoLevel/dhiego_level_v2_bg.csv");
  }

  create() {
    this.bg_map = this.make.tilemap({ key: "dhiegobg", tileWidth: 16, tileHeight: 16 });
    this.bg_tileset = this.bg_map.addTilesetImage("Textures.simple");
    this.map = this.make.tilemap({ key: "dhiegomap", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("Textures.simple");
    this.bg_layer = this.bg_map.createLayer(0, this.tileset, 0, 0);
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.map.setCollisionBetween(0, 10);

    let gridConfig = {
      scene: this,
      cols: 20,
      rows: 20,
    };

    this.customGrid = new AlignGrid(gridConfig);
    // this.customGrid.show();
    // this.customGrid.showNumbers();

    makeLadder(this, [281, 341]);
    makeLadder(this, [159, 239]);
    makeLadder(this, [41, 121]);

    this.playerObject = new Luiz(this);
    this.playableCharacter = this.playerObject.invokePlayableCharacter();
    this.playableCharacter.setCollideWorldBounds(true);
    this.physics.add.collider(this.playableCharacter, this.layer);
    this.physics.add.overlap(this.playableCharacter, this.ladderGroup);
    this.customGrid.placeAtIndex(379, this.playableCharacter);

    [265, 274, 367].forEach((pos) => {
      this.makeEnemy(pos, Bee);
    });
  }

  makeEnemy(pos, EnemyClass) {
    const enemyObject = new EnemyClass(this);
    const enemyBody = enemyObject.invokeEnemyCharacter();
    this.customGrid.scaleToGameW(enemyBody, 0.5);
    this.customGrid.placeAtIndex(pos, enemyBody);

    this.physics.add.overlap(
      this.playableCharacter,
      enemyBody,
      () => {
        this.scene.sleep("dhiegolevel").run("question", { enemy: enemyObject, player: this.playerObject });
      },
      null,
      this
    );
  }

  checkLadder() {
    this.onLadder = false;
    this.ladderGroup.children.iterate(
      function (child) {
        if (!child.body.touching.none) {
          this.onLadder = true;
        }
      }.bind(this)
    );
    console.log(this.onLadder);
  }

  update() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    this.playerObject.handleGameplay(this, this.playableCharacter);
  }
}
