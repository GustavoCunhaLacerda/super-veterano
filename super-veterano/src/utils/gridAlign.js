import { game } from "..";

export class AlignGrid {
  constructor(config) {
    if (!config.scene) {
      console.log("missing scene!");
      return;
    }
    if (!config.rows) {
      config.rows = 38;
    }
    if (!config.cols) {
      config.cols = 38;
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

    //cw cell width is the scene width divided by the number of columns
    this.cw = this.w / this.cols;
    //ch cell height is the scene height divided the number of rows
    this.ch = this.h / this.rows;

    console.log(this.cw, this.ch);
  }
  //mostly for planning and debugging this will
  //create a visual representation of the grid
  show(a = 1) {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(1, 0xff0000, a);
    //
    //
    //this.graphics.beginPath();
    for (var i = 0; i < this.w; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.h);
    }
    for (var i = 0; i < this.h; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.w, i);
    }
    this.graphics.strokePath();
  }

  showNumbers(a = 1) {
    this.show(a);
    var n = 0;
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var numText = this.scene.add.text(0, 0, n, {
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
    //calculate the center of the cell
    //by adding half of the height and width
    //to the x and y of the coordinates
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index, obj) {
    var yy = Math.floor(index / this.cols);
    var xx = index - yy * this.cols;
    this.placeAt(xx, yy, obj);
  }
}
