import constants from "../../../../global/constants";

export default {
  walk(phaserScene) {
    if (phaserScene.baseGameplayCursor.left.isDown) {
      this._movePlayer(phaserScene, "R");
    } else if (phaserScene.baseGameplayCursor.right.isDown) {
      this._movePlayer(phaserScene, "L");
    } else {
      this._pausePlayer(phaserScene);
    }  
  },

  jump(phaserScene) {
    if (phaserScene.baseGameplayCursor.up.isDown && phaserScene.player.sprite.body.blocked.down) {
        phaserScene.player.sprite.setVelocityY(-300);
        phaserScene.player.sprite.anims.play("jump", true);
    }
  },
  
  chooseAnswer() {},

  _pausePlayer(phaserScene) {
    phaserScene.player.sprite.setVelocityX(0);
    phaserScene.player.sprite.anims.play("idle", true);
  },

  _movePlayer(phaserScene, SENSE) {
    const signal = SENSE == "R" ? -1 : 1;
    const speed = constants.PLAYER_X_MOVESPEED;
    phaserScene.player.sprite.setVelocityX(speed * signal);
    phaserScene.player.sprite.body.blocked.down && phaserScene.player.sprite.anims.play("walk", true);
    phaserScene.player.sprite.flipX = SENSE == "R" ? true : false;
  }
};
