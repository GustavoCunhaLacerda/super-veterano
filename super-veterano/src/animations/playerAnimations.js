export default {
  walkAnimation(ref) {
      ref.anims.create({
          key: "walk",
          frames: ref.anims.generateFrameNumbers("luiz_walk", {
            frames: [0, 1, 2, 3],
          }),
          frameRate: 8,
          repeat: -1,
        });
    },

  idleAnimation(ref) {
    ref.anims.create({
      key: "idle",
      frames: ref.anims.generateFrameNumbers("luiz_idle", {
        frames: [0, 1, 2, 3, 4],
      }),
      frameRate: 8,
      repeat: -1,
    });
  },

  jumpAnimation(ref) {
    ref.anims.create({
      key: "jump",
      frames: ref.anims.generateFrameNumbers("luiz_jump", {
        frames: [0],
      }),
      frameRate: 8,
      repeat: -1,
    });
  },
};
