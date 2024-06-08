function nearPoint(x, y, x1, y1, name) {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
}
export default nearPoint;
