export function setHover(btnRef, textRef) {
  btnRef.setInteractive();
  btnRef.on("pointerover", () => {
    btnRef.setScale(1.1);
    textRef.setScale(1.1);
  });
  btnRef.on("pointerout", () => {
    btnRef.setScale(1);
    textRef.setScale(1);
  });
}

export function setOnPress(btnRef, activationFunction) {
  btnRef.on("pointerdown", () => {
    activationFunction();
  });
}
