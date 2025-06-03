import { player } from "../main.js";

addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") player.mov_x = player.speed;
  else if (e.key == "ArrowLeft") player.mov_x = -player.speed;
});

addEventListener("keyup", function (e) {
  if (e.key == "ArrowRight" && player.mov_x > 0) player.mov_x = 0;
  else if (e.key == "ArrowLeft" && player.mov_x < 0) player.mov_x = 0;
});
