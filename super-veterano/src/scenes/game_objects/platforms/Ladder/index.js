export function makeLadder(phaserScene, [initialPos, finalPos], direction = "VERTICAL") {
  if (!phaserScene.ladderGroup) {
    phaserScene.ladderGroup = phaserScene.physics.add.group({
      allowGravity: false,
    });
  }

  const coef = direction === "VERTICAL" ? 20 : 1;

  for (let pos = initialPos; pos <= finalPos; pos += coef) {
    console.log(pos);
    let obj = phaserScene.physics.add.image(0, 0, getKey(pos, [initialPos, finalPos]));
    phaserScene.customGrid.scaleToGameW(obj);
    phaserScene.customGrid.placeAtIndex(pos, obj);
    phaserScene.ladderGroup.add(obj);
  }
}

function getKey(pos, [initialPos, finalPos]) {
  if (pos === initialPos) return "Sprites.itens.ladderTop";
  if (pos === finalPos) return "Sprites.itens.ladderBot";
  return "Sprites.itens.ladder";
}
