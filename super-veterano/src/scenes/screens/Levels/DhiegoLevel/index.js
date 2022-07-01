import Phaser from "phaser";
import Luiz from "../../../game_objects/player/Luiz";
import Dhiego from "../../../game_objects/enemies/bosses/Dhiego";
import addUiButton from "../../../components/UiButton";

import { AlignGrid } from "../../../../utils/gridAlign";
import { game } from "../../../..";
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

    this.aGrid = new AlignGrid(gridConfig);
    this.aGrid.show();
    this.aGrid.showNumbers();

    this.ladderGroup = this.physics.add.group({
      // immovable: true,
      allowGravity: false,
    });

    
    this.player = new Luiz(this);
    this.player.sprite.setCollideWorldBounds(true);
    this.physics.add.collider(this.player.sprite, this.layer);
    this.aGrid.placeAtIndex(379, this.player.sprite);
    
    [280, 300, 320, 340].forEach((pos) => {
      this.makeLadder(pos, "Sprites.itens.ladder");
    });


    this.physics.add.overlap(this.player.sprite, this.ladderGroup);
  }

  makeLadder(pos, key) {
    let obj = this.physics.add.image(0, 0, key);
    this.aGrid.scaleToGameW(obj);
    this.aGrid.placeAtIndex(pos, obj);
    this.ladderGroup.add(obj);
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
    this.player.handleGameplay(this);
  }
}
