import rough from "roughjs/bundled/rough.esm";
import tools from "../attitude/tools";
const generator = rough.generator();
function createElement(id, x1, y1, x2, y2, type, options) {
  switch (type) {
    case tools.line:
    case tools.rectangle:
      const roughElement =
        type === tools.line
          ? generator.line(x1, y1, x2, y2, {
              stroke: options.color,
              strokeWidth: options.size,
            })
          : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
              stroke: options.color,
              strokeWidth: options.size,
            });
      return { id, type, x1, y1, x2, y2, roughElement, options };
    case tools.pencil:
      return { id, type, points: [{ x: x1, y: y1 }], options };
    case tools.text:
      return { id, type, x1, y1, x2, y2, options };
    case tools.image:
      return { id, type, x1, y1, x2, y2, options };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
}

export default createElement;
