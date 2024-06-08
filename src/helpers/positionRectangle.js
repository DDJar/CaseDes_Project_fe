import positions from "../attitude/positions";
import nearPoint from "./nearPoint";

function positionRectangle(x, y, x1, y1, x2, y2) {
  const topLeft = nearPoint(x, y, x1, y1, positions.tl);
  const topRight = nearPoint(x, y, x2, y1, positions.tr);
  const bottomLeft = nearPoint(x, y, x1, y2, positions.bl);
  const bottomRight = nearPoint(x, y, x2, y2, positions.br);
  const inside =
    x >= x1 && x <= x2 && y >= y1 && y <= y2 ? positions.inside : null;
  return topLeft || topRight || bottomLeft || bottomRight || inside;
}

export default positionRectangle;
