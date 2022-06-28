class Question {
  constructor(question, image, answer, options) {
    this.question = question;
    this.image = image;
    this.answer = answer;
    this.options = options;
  }

  isCorrect(answer) {
    return answer === this.answer;
  }
}

export function getQuestion(subject, difficulty) {
  return {
    question: "1+1 = ?",
    image: null,
    answer: "2",
    options: ["1", "2", "3"],
  };
}
