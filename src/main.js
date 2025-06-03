import { Player } from "./player/player.js";
import { projectile_array } from "./keyboardInteraction.js";

const canvas = document.getElementById("game_canvas");
canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext("2d");
export let player = new Player();

function update() {
  player.pos_x += player.mov_x;
  if (player.pos_x < 5) player.pos_x = 5;
  if (player.pos_x > 1099) player.pos_x = 1099;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(player.sprite, player.pos_x, 720, player.width, player.height);
  for (let i = projectile_array.length - 1; i >= 0; i--) {
    const element = projectile_array[i];
    if (element.pos_y > 0) {
      element.draw(ctx);
      element.pos_y += element.speed_y;
    } else {
      projectile_array.splice(i, 1); // Remove the projectile
    }
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
