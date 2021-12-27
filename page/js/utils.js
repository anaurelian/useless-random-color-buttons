'use strict';

function getRandomPosition(child) {
  const childRect = child.getBoundingClientRect();
  const parentRect = child.parentNode.getBoundingClientRect();
  const left = Math.random() * (parentRect.width - childRect.width);
  const top = Math.random() * (parentRect.height - childRect.height);
  return { left: left, top: top };
}

function getRandomColor() {
  const hexcolor = `${Math.random().toString(16).slice(-6)}`;
  const contrastColor = getContrastYIQ(hexcolor);
  return { backcolor: `#${hexcolor}`, textcolor: contrastColor };
}

function getContrastYIQ(hexcolor) {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

export { getRandomPosition, getRandomColor };