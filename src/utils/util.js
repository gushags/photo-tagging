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

export const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
