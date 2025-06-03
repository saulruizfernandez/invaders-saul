import { player } from "./main.js";
import { Projectile } from "./projectile/projectile.js";

// Array to store active projectiles
export let projectile_array = [];

addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") player.mov_x = player.speed;
  else if (e.key == "ArrowLeft") player.mov_x = -player.speed;
  else if (e.key == " ") {
    projectile_array.push(new Projectile(player.pos_x + 46.5));
  }
});

addEventListener("keyup", function (e) {
  if (e.key == "ArrowRight" && player.mov_x > 0) player.mov_x = 0;
  else if (e.key == "ArrowLeft" && player.mov_x < 0) player.mov_x = 0;
});
