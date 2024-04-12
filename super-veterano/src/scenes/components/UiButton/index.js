import { setHover, setOnPress } from "../../../utils/btnEffects";

export default function addUiButton(phaserScene, x, y, text, callback) {
  const startGame_btn = phaserScene.add.image(x, y, "Interface.button.base").setScale(0.6);
  const startBtn_text = phaserScene.add
    .text(startGame_btn.x, startGame_btn.y, text, {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "32px",
      color: "#ffffff",
    })
    .setOrigin(0.5)
    .setScale(0.6);

  setHover(startGame_btn, startBtn_text);
  setOnPress(startGame_btn, callback);
}
