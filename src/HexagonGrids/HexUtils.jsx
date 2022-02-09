import Hex from "./Models/Hex";
import Point from "./Models/Point";

class HexUtils {
  static DIRECTION_VECTS = [
    new Hex(+1, 0, -1),
    new Hex(+1, -1, 0),
    new Hex(0, -1, +1),
    new Hex(-1, 0, +1),
    new Hex(-1, +1, 0),
    new Hex(0, +1, -1),
  ];

  static hex_add(hex, vec) {
    return new Hex(hex.q + vec.q, hex.r + vec.r, hex.s + vec.s);
  }

  static hex_subtract(a, b) {
    return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
  }

  static point_add(a, b) {
    return new Point(a.x + b.x, a.y + b.y);
  }

  static point_subtract(a, b) {
    return new Point(a.x - b.x, a.y - b.y);
  }

  static hex_neighbor(hex, dir) {
    return this.hex_add(hex, this.DIRECTION_VECTS[dir]);
  }

  static hex_distance(a, b) {
    const vec = this.hex_subtract(a, b);
    return (Math.abs(vec.q) + Math.abs(vec.r) + Math.abs(vec.s)) / 2;
  }

  static hexToPoint(hex, size) {
    const x = size * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r);
    const y = size * ((3 / 2) * hex.r);
    return new Point(x, y);
  }

  static pointyHexCorner(center, size, i) {
    const angle_deg = 60 * i - 30;
    const angle_rad = (Math.PI / 180) * angle_deg;
    const x = center.x + size * Math.cos(angle_rad);
    const y = center.y + size * Math.sin(angle_rad);
    return new Point(x, y);
  }

  static getHexCorners(hex, size) {
    let corners = [];
    const center = this.hexToPoint(hex, size);
    for (let i = 0; i < 6; i++) {
      const point = this.pointyHexCorner(center, size, i);
      corners.push(point);
    }
    return corners;
  }

  static cornersCoordToString(corners) {
    return corners.map((point) => `${point.x},${point.y}`).join(" ");
  }

  static getStrHexCorners(hex, size) {
    const corners = this.getHexCorners(hex, size);
    return this.cornersCoordToString(corners);
  }
}

export default HexUtils;
