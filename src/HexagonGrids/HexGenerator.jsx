import Hex from "./Models/Hex";
// import HexUtils from "./HexUtils";

class HexGenerator {
  static getGenerator(name) {
    if (HexGenerator.hasOwnProperty(name)) return HexGenerator[name];

    return null;
  }

  static hexagon(mapRadius) {
    let hexas = [];
    for (let q = -mapRadius; q <= mapRadius; q++) {
      let r1 = Math.max(-mapRadius, -q - mapRadius);
      let r2 = Math.min(mapRadius, -q + mapRadius);
      for (let r = r1; r <= r2; r++) {
        hexas.push(
          new Hex(q + mapRadius, r + mapRadius, -q - r - mapRadius * 2)
        );
      }
    }

    return hexas;
  }

  static hexagonArr(mapRadius) {
    let hexas = this.hexagon(mapRadius);
    let hexArr = Array.from(
      Array(mapRadius * 2 + 1),
      () => new Array(mapRadius * 2 + 1)
    );
    hexas.forEach((hex) => {
      hexArr[hex.q][hex.r] = hex;
    });
    return hexArr;
  }

  static rectangle(mapWidth, mapHeight) {
    let hexas = [];
    for (let r = 0; r < mapHeight; r++) {
      let offset = Math.floor(r / 2); // or r>>1
      for (let q = -offset; q < mapWidth - offset; q++) {
        hexas.push(new Hex(q, r, -q - r));
      }
    }

    return hexas;
  }
}

export default HexGenerator;
