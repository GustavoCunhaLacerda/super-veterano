export default {
  walkAnimation(ref, spritesheetKey) {
    ref.anims.create({
      key: "walk",
      frames: ref.anims.generateFrameNumbers(spritesheetKey, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });
  },

  idleAnimation(ref, spritesheetKey) {
    ref.anims.create({
      key: "idle",
      frames: ref.anims.generateFrameNumbers(spritesheetKey, {
        frames: [0, 1, 2, 3, 4],
      }),
      frameRate: 8,
      repeat: -1,
    });
  },

  jumpAnimation(ref, spritesheetKey) {
    ref.anims.create({
      key: "jump",
      frames: ref.anims.generateFrameNumbers(spritesheetKey, {
        frames: [0],
      }),
      frameRate: 8,
      repeat: -1,
    });
  },
};
