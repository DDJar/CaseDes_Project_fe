import positionWithinElement from "./positionWithinElement"
function getElementAtPosition(x, y, elements) {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
}

export default getElementAtPosition;
