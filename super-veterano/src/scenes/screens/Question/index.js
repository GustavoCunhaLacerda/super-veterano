import Phaser from "phaser";
import { getQuestion } from "./question_bank";
import { AlignGrid } from "../../../utils/gridAlign";

let question_type = "undefined";
export default class Question extends Phaser.Scene {
  constructor() {
    super({ key: "question" });
  }

  init(data) {
    this.playerObject = data.player;
    this.enemyObject = data.enemy;
  }

  preload() {
    this.load.tilemapCSV("dhiego_question_map", "src/scenes/screens/Question/dhiego_question_map.csv");
    this.load.tilemapCSV("dhiego_question_board", "src/scenes/screens/Question/dhiego_question_map_board.csv");
  }

  create() {
    this.board_map = this.make.tilemap({ key: "dhiego_question_board", tileWidth: 16, tileHeight: 16 });
    this.board_tileset = this.board_map.addTilesetImage("Textures.board");
    this.board_layer = this.board_map.createLayer(0, this.board_tileset, 0, 0);

    this.bg_map = this.make.tilemap({ key: "dhiego_question_map", tileWidth: 16, tileHeight: 16 });
    this.bg_tileset = this.bg_map.addTilesetImage("Textures.simple");
    this.bg_layer = this.bg_map.createLayer(0, this.bg_tileset, 0, 0);

    this.bg_layer.setCollisionBetween(0, 10);

    this.customGrid = new AlignGrid({
      scene: this,
      cols: 20,
      rows: 20,
    });

    this.customGrid.show();
    this.customGrid.showNumbers();

    this.playerTotem = this.playerObject.invokePlayerTotem(this);
    this.playerTotem.body.setAllowGravity(true);
    this.enemyTotem = this.enemyObject.invokeEnemyTotem(this);

    this.customGrid.placeAtIndex(104, this.playerTotem);
    this.customGrid.scaleToGameW(this.playerTotem, this.enemyTotem.type == "dhiego" ? 2 : 5);

    this.physics.add.collider(this.enemyTotem, this.bg_layer);
    this.physics.add.collider(this.playerTotem, this.bg_layer);

    console.log(this.enemyTotem.type);
    
    switch (this.enemyTotem.type) {
      case "dog":
        this.customGrid.placeAtIndex(116, this.enemyTotem);
        this.customGrid.scaleToGameW(this.enemyTotem, 5);
        this.enemyTotem.body.setAllowGravity(true);
        question_type = "sub"
        break;
      case "bee":
        this.customGrid.placeAtIndex(116, this.enemyTotem);
        this.customGrid.scaleToGameW(this.enemyTotem, 2);
        question_type = "sum"
        break;
      case "dhiego":
        this.customGrid.placeAtIndex(116, this.enemyTotem);
        this.customGrid.scaleToGameW(this.enemyTotem, 4.5);
        this.enemyTotem.body.setAllowGravity(true);
        question_type = "calc"
        break;
      case "sigma":
        this.customGrid.placeAtIndex(116, this.enemyTotem);
        this.customGrid.scaleToGameW(this.enemyTotem, 2);
        this.enemyTotem.body.setAllowGravity(true);
        question_type = "calc"
        break;
      default:
        break;
    }

    this.question = getQuestion(question_type);

    this.checkAnswer = (answer, index) => {
      console.log(this.question.options[0]);
      if (answer === this.question.options[index]) {
        this.enemyObject.damage(1);
      } else {
        this.playerObject.damage(1);
      }
    };

    const questionText = this.add
      .text(0, 0, this.question.question, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "16px",
        color: "#fff",
      })
      .setOrigin(0.5);

    this.customGrid.placeAtIndex(230, questionText);

    const ansPos = [305, 345, 314, 354];
    const answers = this.question.options.map((option, index) => {
      const answer = this.add
        .text(250 + index * 50, 400, option, {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "16px",
          color: "#fff",
        })
        .setOrigin(0.5);
      this.customGrid.placeAtIndex(ansPos[index], answer);

      return answer;
    });

    answers.forEach((answer, index) => {
      answer.setInteractive();
      answer.on("pointerover", () => {
        answer.setScale(1.3);
      });
      answer.on("pointerout", () => {
        answer.setScale(1);
      });
      answer.on("pointerdown", () => {
        console.log(answer);
        this.checkAnswer(this.question.answer, index);
        this.question = getQuestion(question_type);
        questionText.setText(this.question.question);
        answers.forEach((answer, index) => {
          answer.setText(this.question.options[index]);
        });
      });
    });
  }
}
