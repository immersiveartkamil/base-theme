import Artwork from "./Artwork.js";

const $wrapper = document.getElementById("webgl-container");

$wrapper.style.position = "fixed";
$wrapper.style.top = 0;
$wrapper.style.left = 0;
$wrapper.style.right = 0;
$wrapper.style.bottom = 0;

const artwork = new Artwork({
  $wrapper: $wrapper,
});

window.getStatusWebGL = function (type) {
  return artwork.getStatusWebGL(type);
};

window.addEventListener("resize", () => {
  artwork.resize();
});
