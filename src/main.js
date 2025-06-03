import { Player } from "./player/player.js";
import { keys } from "./keyboardInteraction.js";
import { Projectile } from "./projectile/projectile.js";

const canvas = document.getElementById("game_canvas");
canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext("2d");

export let player = new Player();

let projectile_array = [];

let threshold_projectile = 350;

let old_time = new Date().getTime();
function update() {
  if (keys["ArrowRight"]) player.mov_x = player.speed;
  else if (keys["ArrowLeft"]) player.mov_x = -player.speed;
  else player.mov_x = 0;
  if (keys[" "]) {
    let current_time = new Date().getTime();
    if (current_time - old_time > threshold_projectile) {
      projectile_array.push(new Projectile(player.pos_x + 45.5));
      old_time = current_time;
    }
  }
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
