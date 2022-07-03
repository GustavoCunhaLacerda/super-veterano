import Phaser from "phaser";
import { getQuestion } from "./question_bank";
import { AlignGrid } from "../../../utils/gridAlign";
import Luiz from "../../game_objects/player/Luiz";
import Bee from "../../game_objects/enemies/common/bee";

export default class Question extends Phaser.Scene {
  constructor() {
    super({ key: "question" });
  }

  init(data) {
    console.log(data);
    this.playerObject = data.player;
    this.enemyObject = data.enemy;
  }

  preload() {
    this.load.tilemapCSV("dhiego_question_map", "src/scenes/screens/Question/dhiego_question_map.csv");
  }

  create() {
    this.bg_map = this.make.tilemap({ key: "dhiego_question_map", tileWidth: 16, tileHeight: 16 });
    this.bg_tileset = this.bg_map.addTilesetImage("Textures.simple");
    this.bg_layer = this.bg_map.createLayer(0, this.bg_tileset, 0, 0);

    this.customGrid = new AlignGrid({
      scene: this,
      cols: 20,
      rows: 20,
    });

    this.customGrid.show();
    this.customGrid.showNumbers();

    this.question = getQuestion();

    // this.player = new Luiz(this, false);
    this.playerTotem = this.playerObject.invokePlayerTotem(this);
    this.customGrid.placeAtIndex(104, this.playerTotem);
    this.customGrid.scaleToGameW(this.playerTotem, 5);

    // this.enemie = new Bee(this, false);
    this.enemyTotem = this.enemyObject.invokeEnemyTotem(this);
    this.customGrid.placeAtIndex(116, this.enemyTotem);
    this.customGrid.scaleToGameW(this.enemyTotem, 2);

    this.checkAnswer = (answer, index) => {
      if (answer === question.options[index]) {
        this.enemyObject.damage(1);
      } else {
        this.playerObject.damage(1);
      }
    };

    let question = getQuestion();

    const questionText = this.add
      .text(0, 0, question.question, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "16px",
        color: "#000",
      })
      .setOrigin(0.5);

    this.customGrid.placeAtIndex(230, questionText);

    const ansPos = [305, 345, 314, 354];
    const answers = question.options.map((option, index) => {
      const answer = this.add
        .text(250 + index * 50, 400, option, {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "16px",
          color: "#000",
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
        this.checkAnswer(question.answer, index);
        question = getQuestion();
        questionText.setText(question.question);
        answers.forEach((answer, index) => {
          answer.setText(question.options[index]);
        });
      });
    });
  }
}
