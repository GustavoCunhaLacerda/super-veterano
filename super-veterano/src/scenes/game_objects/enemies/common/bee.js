import Enemy from "../Enemy";

export default class Bee extends Enemy {
  constructor(phaserScene) {
    super(phaserScene, "Somabelha", "bee", 2, "Sprites.enemies.bee.idle", false,  [0, 1]);
  }
  handleMoves(countAux, signal) {
    this.body.flipX = signal == 1 ? true : false;
    try {
      this.body.setVelocityX(10 * signal);
    } catch (error) {
      console.log("erro no movimento da abelha");
    }
  }
}
