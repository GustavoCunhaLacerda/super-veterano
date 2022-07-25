import Enemy from "../Enemy";

export default class Sigma extends Enemy {
  constructor(phaserScene) {
    super(phaserScene, "Espírito Sigma", "sigma", 2, "Sprites.enemies.sigma.idle", true, [0, 1, 2]);
  }

  handleMoves(countAux, signal) {
    this.body.flipX = signal == 1 ? true : false;
    try {
      this.body.setVelocityX(10 * signal);
    } catch (error) {
      console.log("erro no movimento do sigma");
    }
  }
}
