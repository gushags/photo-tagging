// util.js

export function getPopupPosition(
  circleX,
  circleY,
  popupW,
  popupH,
  containerRect,
  offset = { x: 35, y: -10 }
) {
  const padding = 5; // minimum distance from container edges
  const gap = -10; // distance between circle and popup

  const xPos = circleX * containerRect.width;
  const yPos = circleY * containerRect.height;
  console.log('xPos:', xPos, 'yPos:', yPos);
  let left = xPos + offset.x;
  let top = yPos + offset.y;

  // Check horizontal overflow
  if (left + popupW + padding > containerRect.width) {
    // flip to the left of the circle
    left = xPos - popupW - gap; // use consistent gap
    if (left < padding) left = padding;
  }

  // Check vertical overflow
  if (top + popupH + padding > containerRect.height) {
    // flip above the circle
    top = yPos - popupH - gap; // use consistent gap
    if (top < padding) top = padding;
  }

  // Optional: keep at least padding from top/left
  if (left < padding) left = padding;
  if (top < padding) top = padding;

  return { left, top };
}

export function checkCoordinatesForPic(cx, cy, objX, objY, dimension, r = 25) {
  const distanceSquared =
    (cx * dimension.width - objX * dimension.width) ** 2 +
    (cy * dimension.height - objY * dimension.height) ** 2;
  if (distanceSquared <= r * r) {
    return true;
  } else {
    return false;
  }
}
