import { Player } from "./player/player.js";
import { SceneInvaders } from "./scene.js";
import { keys } from "./keyboardInteraction.js";
import { EnemyMatrix } from "./enemy/enemyMatrix.js";

// Canvas config
const canvas = document.getElementById("game_canvas");
canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext("2d");

// Create player and scene
let player = new Player();
let scene = new SceneInvaders(5000);
let enemyMatrix = new EnemyMatrix();
let directionMatrix = 1;

// Step movement of enemies
let old_enemy_step_time = new Date().getTime();
let skin = 1;

document.fonts.ready.then(() => {
  function update() {
    player.enable_move(keys);
    player.enable_shoot(keys, scene.projectile_player_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Refresh screen
    player.show(ctx);
    scene.enable_ovni(ctx, canvas.width);
    scene.enable_player_projectile_interaction(ctx);
    scene.enable_explotion_ovni();
    scene.update_score(ctx);
    enemyMatrix.update(ctx);
    let current_enemy_step_time = new Date().getTime();
    if (current_enemy_step_time - old_enemy_step_time > 400) {
      enemyMatrix.move(canvas.width);
      old_enemy_step_time = current_enemy_step_time;
      skin *= -1;
      enemyMatrix.change_skin(skin);
    }
    console.log(directionMatrix);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
});
