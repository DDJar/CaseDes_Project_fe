import getStroke from "perfect-freehand";
import getSvgPathFromStroke from "./getSvgPathFromStroke";
import tools from "../attitude/tools";

function drawElement(roughCanvas, context, element) {
  switch (element.type) {
    case tools.line:
    case tools.rectangle:
      roughCanvas.draw(element.roughElement);
      break;
    case tools.pencil:
      const stroke = getSvgPathFromStroke(
        getStroke(element.points, {
          size: element.options.size,
        })
      );
      context.fillStyle = element.options.color;
      context.fill(new Path2D(stroke));
      break;
    case tools.text:
      context.textBaseline = "top";
      context.font = `
      ${element.options.textStyle.bold ? "bold" : ""}
      ${element.options.textStyle.italic ? "italic" : ""}
      ${element.options.size}px 
      ${element.options.textStyle.font}`;
      context.fillStyle = element.options.color;
      context.fillText(element.options.text, element.x1, element.y1);

      break;

    case tools.image:
      const width = element.x2 - element.x1;
      const height = element.y2 - element.y1;

      const img = new Image()
      img.src = element.options.image
      
      context.drawImage(
        img,
        element.x1,
        element.y1,
        width,
        height
      );
      // context.rotate((30 * Math.PI) / 180);
      break;
    default:
      throw new Error(`Type not recognised: ${element.type}`);
  }
}

export default drawElement;
