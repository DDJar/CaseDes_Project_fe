import positions from "../attitude/positions";
import tools from "../attitude/tools";
import nearPoint from "./nearPoint";
import onLine from "./onLine";
import positionRectangle from "./positionRectangle";

function positionWithinElement(x, y, element) {
  const { type, x1, x2, y1, y2 } = element;

  switch (type) {
    case tools.rectangle:
      return positionRectangle(x, y, x1, y1, x2, y2);
    case tools.line:
      const on = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, positions.start);
      const end = nearPoint(x, y, x2, y2, positions.end);

      return on || start || end;
    case tools.pencil:
      const betweenAnyPoints = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return (
          onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null
        );
      });
      return betweenAnyPoints ? positions.inside : null;
    case tools.text:
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? positions.inside : null;
    case tools.image:
      return positionRectangle(x, y, x1, y1, x2, y2);
    default:
      return false;
  }
}
export default positionWithinElement;
