export function setHover(btnRef, textRef) {
  btnRef.setInteractive();
  btnRef.on("pointerover", () => {
    btnRef.setScale(0.65);
    textRef.setScale(0.65);
  });
  btnRef.on("pointerout", () => {
    btnRef.setScale(0.6);
    textRef.setScale(0.6);
  });
}

export function setOnPress(btnRef, activationFunction) {
  btnRef.on("pointerdown", () => {
    activationFunction();
  });
}
