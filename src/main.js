import { Player } from "./player/player.js";

const canvas = document.getElementById("game_canvas");
canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext("2d");
export let player = new Player();

function updatePlayerPos() {
  player.pos_x += player.mov_x;
  if (player.pos_x < 5) player.pos_x = 5;
  if (player.pos_x > 1135) player.pos_x = 1135;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(player.sprite, player.pos_x, 720, player.width, player.height);
  requestAnimationFrame(updatePlayerPos);
}

requestAnimationFrame(updatePlayerPos);
