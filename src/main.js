// https://classicgaming.cc/classics/space-invaders/sounds

import { Player } from "./player/player.js";
import { SceneInvaders } from "./scene.js";
import { keys } from "./keyboardInteraction.js";
import { EnemyMatrix } from "./enemy/enemyMatrix.js";
import { Projectile } from "./enemy/projectile.js";

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

// Enemies killed
let enemies_killed = [];
let counter_enemies_killed = 0;

let enemy_projectiles = [];

let player_dying = false;
let player_death_time;
let death_animation_time;

function handlePlayerDeathAnimation() {
  let current_time = new Date().getTime();

  // Toggle sprite every 60ms
  if (current_time - death_animation_time > 70) {
    if (player.sprite.src.includes("player_death_1.png")) {
      player.sprite.src = "sprites/player_death_2.png";
    } else {
      player.sprite.src = "sprites/player_death_1.png";
    }
    death_animation_time = current_time;
  }
}

document.fonts.ready.then(() => {
  function update() {
    player.enable_move(keys);
    player.enable_shoot(keys, scene.projectile_player_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Refresh screen
    player.show(ctx);
    scene.enable_ovni(ctx, canvas.width);
    scene.enable_player_projectile_interaction(
      ctx,
      enemyMatrix,
      enemies_killed
    );
    for (let i = 0; i < enemies_killed.length; i++) {
      if (new Date().getTime() - enemies_killed[i][2] > 100) {
        enemyMatrix.matrix[enemies_killed[i][0]][enemies_killed[i][1]] = "k";
        counter_enemies_killed++;
        enemies_killed.splice(i, 1);
      }
    }
    scene.enable_explotion_ovni();
    scene.update_score(ctx);
    scene.update_lifes(ctx, player.lifes);
    enemyMatrix.update(ctx);
    if (player_dying) {
      handlePlayerDeathAnimation();

      // Check if death animation should end
      if (new Date().getTime() - player_death_time > 2000) {
        player_dying = false;
        player.sprite.src = "sprites/player_sprite.png";
      }
    }
    let current_enemy_step_time = new Date().getTime();
    if (
      current_enemy_step_time - old_enemy_step_time >
      400 - counter_enemies_killed * 3
    ) {
      enemyMatrix.move(canvas.width, counter_enemies_killed);
      old_enemy_step_time = current_enemy_step_time;
      skin *= -1;
      enemyMatrix.change_skin(skin);
    }
    scene.enable_enemy_projectile(
      enemyMatrix,
      enemy_projectiles,
      counter_enemies_killed
    );
    for (let i = enemy_projectiles.length - 1; i >= 0; i--) {
      let projectile = enemy_projectiles[i];
      if (projectile.y < canvas.height) {
        projectile.draw(ctx);
        projectile.move();
      } else {
        enemy_projectiles.splice(i, 1); // Eliminates projectile
      }
      if (
        projectile.y > player.y &&
        projectile.x > player.x &&
        projectile.x < player.x + player.width
      ) {
        enemy_projectiles.splice(i, 1);
        player.lifes--;
        player.sprite.src = "sprites/player_death_1.png";
        player_dying = true;
        player_death_time = new Date().getTime();
        death_animation_time = player_death_time;
      }
    }
    console.log(directionMatrix);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
});
