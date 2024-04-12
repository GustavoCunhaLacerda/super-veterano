import constants from "../../../../../global/constants";

export default {
  walk(phaserScene, sprite) {
    if (phaserScene.baseGameplayCursor.left.isDown) {
      this._movePlayer(sprite, "R");
    } else if (phaserScene.baseGameplayCursor.right.isDown) {
      this._movePlayer(sprite, "L");
    } else {
      this._pausePlayer(sprite);
    }
  },

  jump(phaserScene, sprite) {
    if (phaserScene.baseGameplayCursor.up.isDown) {
      sprite.anims.play("jump", true);
      phaserScene.checkLadder();
      console.log(phaserScene.onLadder);
      if (phaserScene.onLadder == true) {
        sprite.setVelocityY(-100);
      } else if (sprite.body.blocked.down) {
        sprite.setVelocityY(-180);
      }
    }
  },

  _pausePlayer(sprite) {
    sprite.setVelocityX(0);
    sprite.anims.play("idle", true);
  },

  _movePlayer(sprite, SENSE) {
    const signal = SENSE == "R" ? -1 : 1;
    const speed = constants.PLAYER_X_MOVESPEED;
    sprite.setVelocityX(speed * signal);
    sprite.body.blocked.down && sprite.anims.play("walk", true);
    sprite.flipX = SENSE == "R" ? true : false;
  },
};
