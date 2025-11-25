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

  let left = circleX + offset.x;
  let top = circleY + offset.y;

  // Check horizontal overflow
  if (left + popupW + padding > containerRect.width) {
    // flip to the left of the circle
    left = circleX - popupW - gap; // use consistent gap
    if (left < padding) left = padding;
  }

  // Check vertical overflow
  if (top + popupH + padding > containerRect.height) {
    // flip above the circle
    top = circleY - popupH - gap; // use consistent gap
    if (top < padding) top = padding;
  }

  // Optional: keep at least padding from top/left
  if (left < padding) left = padding;
  if (top < padding) top = padding;

  return { left, top };
}
