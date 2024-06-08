function resizedCoordinates(offsetX, offsetY, position, coordinates) {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: offsetX, y1: offsetY, x2, y2 };
    case "tr":
      return { x1, y1: offsetY, x2: offsetX, y2 };
    case "bl":
      return { x1: offsetX, y1, x2, y2: offsetY };
    case "br":
    case "end":
      return { x1, y1, x2: offsetX, y2: offsetY };

    default:
      return null;
  }
}
export default resizedCoordinates;
