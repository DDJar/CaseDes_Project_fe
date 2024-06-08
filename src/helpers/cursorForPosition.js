function cursorForPosition(position) {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";

    default:
      return "move";
  }
}

export default cursorForPosition;
