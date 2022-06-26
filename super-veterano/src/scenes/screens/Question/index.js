import Phaser from "phaser";
import { getQuestion } from "./question_bank";

export default class Question extends Phaser.Scene {
  constructor() {
    super("question");
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this.checkAnswer = (answer, index) => {
      if (answer === question.options[index]) {
        this.scene.start("dhiegolevel");
      } else {
        this.scene.start("mainmenu");
      }
    };

    const question = getQuestion();

    const questionText = this.add
      .text(300, 300, question.question, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const answers = question.options.map((option, index) => {
      const answer = this.add
        .text(250 + index * 50, 400, option, {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "32px",
          color: "#ffffff",
        })
        .setOrigin(0.5);
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
      });
    });
  }
}
