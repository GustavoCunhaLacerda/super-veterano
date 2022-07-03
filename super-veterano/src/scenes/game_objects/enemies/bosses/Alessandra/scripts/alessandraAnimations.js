export default {
  writeAnimation(ref, spritesheetKey) {
    ref.anims.create({
      key: "writing",
      frames: ref.anims.generateFrameNumbers(spritesheetKey, {
        frames: [0, 1, 2],
      }),
      frameRate: 8,
      repeat: -1,
    });
  },
};
