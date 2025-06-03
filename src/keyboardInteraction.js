export let keys = {};

addEventListener("keydown", function (e) {
  keys[e.key] = true;
  if (e.key == " ") {
  }
});

addEventListener("keyup", function (e) {
  keys[e.key] = false;
});
