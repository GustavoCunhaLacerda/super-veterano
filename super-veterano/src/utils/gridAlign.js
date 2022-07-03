import { game } from "..";

export class AlignGrid {
  constructor(config) {
    if (!config.scene) {
      console.log("missing scene!");
      return;
    }
    if (!config.rows) {
      config.rows = 16;
    }
    if (!config.cols) {
      config.cols = 16;
    }
    if (!config.width) {
      config.width = game.config.width;
    }
    if (!config.height) {
      config.height = game.config.height;
    }
    this.h = config.height;
    this.w = config.width;
    console.log(this.h, this.w);
    this.rows = config.rows;
    this.cols = config.cols;
    this.scene = config.scene;
    console.log(this.rows, this.cols);

    this.cw = this.w / this.cols;
    this.ch = this.h / this.rows;

    console.log(this.cw, this.ch);
  }

  show(a = 1) {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(1, 0xff0000, a);

    for (let i = 0; i < this.w; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.h);
    }
    for (let i = 0; i < this.h; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.w, i);
    }
    this.graphics.strokePath();
  }

  showNumbers(a = 1) {
    this.show(a);
    let n = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let numText = this.scene.add.text(0, 0, n, {
          color: "red",
          fontSize: "8px",
        });
        numText.setOrigin(0.5, 0.5);
        this.placeAt(j, i, numText);
        n++;
      }
    }
  }

  placeAt(xx, yy, obj) {
    let x2 = this.cw * xx + this.cw / 2;
    let y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index, obj) {
    let yy = Math.floor(index / this.cols);
    let xx = index - yy * this.cols;
    this.placeAt(xx, yy, obj);
  }

  scaleToGameW(obj, scale = 1) {
    obj.displayWidth = scale * game.config.width / 20;
    obj.scaleY = obj.scaleX;
  }
}
