import Phaser from "phaser";
import { AlignGrid } from "../../../../utils/gridAlign";

export default class BaseLevel extends Phaser.Scene {
  constructor(key, debug) {
    super({ key });
    this.key = key;
    this.debug = debug;
  }

  useGrid(n_cols = 20, n_rols = 20) {
    let gridConfig = {
      scene: this,
      cols: n_cols,
      rows: n_rols,
    };

    this.customGrid = new AlignGrid(gridConfig);
    if (this.debug) {
      this.customGrid.show();
      this.customGrid.showNumbers();
    }
  }

  makeEnemy(pos, EnemyClass, scale = 0.5) {
    const enemyObject = new EnemyClass(this);
    const enemyBody = enemyObject.invokeEnemyCharacter();
    this.customGrid.scaleToGameW(enemyBody, scale);
    this.customGrid.placeAtIndex(pos, enemyBody);

    this.physics.add.overlap(
      this.playableCharacter,
      enemyBody,
      () => {
        this.scene.sleep(this.key).run("question", { enemy: enemyObject, player: this.playerObject });
      },
      null,
      this
    );

    return enemyObject;
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
  }

  gameplayHandler() {
    this.baseGameplayCursor = this.input.keyboard.createCursorKeys();
    this.playerObject.handleGameplay(this, this.playableCharacter);
  }
}
