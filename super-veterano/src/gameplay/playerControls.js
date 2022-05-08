import constants from "../global/constants";

export default {
  walk(ref) {
    if (ref.baseGameplayCursor.left.isDown) {
      this._movePlayer(ref, "R");
    } else if (ref.baseGameplayCursor.right.isDown) {
      this._movePlayer(ref, "L");
    } else {
      this._pausePlayer(ref);
    }  
  },

  jump(ref) {
    if (ref.baseGameplayCursor.up.isDown && ref.player.body.touching.down) {
        ref.player.setVelocityY(-400);
        ref.player.anims.play("jump", true);
    }
  },
  
  chooseAnswer() {},

  _pausePlayer(ref) {
    ref.player.setVelocityX(0);
    ref.player.anims.play("idle", true);
  },

  _movePlayer(ref, SENSE) {
    const signal = SENSE == "R" ? -1 : 1;
    const speed = constants.PLAYER_X_MOVESPEED;
    ref.player.setVelocityX(speed * signal);
    ref.player.body.touching.down && ref.player.anims.play("walk", true);
    ref.player.flipX = SENSE == "R" ? true : false;
  }
};
