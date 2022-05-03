export default {

    walkAnimation(ref) {
        ref.anims.create({
            key: "walk",
            frames: ref.anims.generateFrameNumbers("luiz", {
              frames: [0, 1, 2, 3, 4, 5],
            }),
            frameRate: 8,
            repeat: -1,
          });
      },

    idleAnimation(ref){
        ref.anims.create({
            key: "idle",
            frames: ref.anims.generateFrameNumbers("luiz", {
              frames: [1],
            }),
            frameRate: 8,
            repeat: -1,
          });
    }
}




  