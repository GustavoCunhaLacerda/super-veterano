import * as questionsList from "./questions.json";
class Question {
  constructor(question, answer, options) {
    this.question = question;
    this.answer = answer;
    this.options = options;
  }

  isCorrect(answer) {
    return answer === this.answer;
  }
}

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getQuestion(type) {
  console.log(type);
  if (type == "sum") {
    const x = generateRandomIntegerInRange(0, 10);
    const y = generateRandomIntegerInRange(0, 10);
    const answer = x + y;

    const options = [answer, answer + generateRandomIntegerInRange(0, 10), answer - generateRandomIntegerInRange(0, 10), answer + generateRandomIntegerInRange(0, 10)];
    shuffleArray(options);

    return new Question(`(${x}) + (${y}) = ?`, answer, options);
  }
  if (type == "sub") {
    const x = generateRandomIntegerInRange(0, 10);
    const y = generateRandomIntegerInRange(0, 10);
    const answer = x - y;

    const options = [answer, answer + generateRandomIntegerInRange(0, 10), answer - generateRandomIntegerInRange(0, 10), answer + generateRandomIntegerInRange(0, 10)];
    shuffleArray(options);

    return new Question(`(${x}) - (${y}) = ?`, answer, options);
  }
  if (type == "calc") {
    const rndNumber = Math.floor(Math.random() * 10) + 1;

    const question = questionsList.default["calc:" + rndNumber];
    shuffleArray(question.options);
    console.log(question.answer);

    return new Question(question.question, question.answer, question.options);
  }
}
