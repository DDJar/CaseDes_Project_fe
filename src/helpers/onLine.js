import positions from "../attitude/positions";
import distance from "./distance";
const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const d1 = distance({ x: x, y: y }, { x: x1, y: y1 });
  const d2 = distance({ x: x, y: y }, { x: x2, y: y2 });
  const lineLength = distance({ x: x1, y: y1 }, { x: x2, y: y2 });

  return d1 + d2 >= lineLength - maxDistance &&
    d1 + d2 <= lineLength + maxDistance
    ? positions.inside
    : null;
};

export default onLine;
