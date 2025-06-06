// https://classicgaming.cc/classics/space-invaders/sounds

import { Player } from "./player/player.js";
import { SceneInvaders } from "./scene.js";
import { keys } from "./keyboardInteraction.js";
import { EnemyMatrix } from "./enemy/enemyMatrix.js";
import { Shield } from "./shield/shield.js";

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

// Shields
const shields = [
  new Shield(100, 600),
  new Shield(400, 600),
  new Shield(700, 600),
  new Shield(1000, 600),
];

function handlePlayerDeathAnimation() {
  let current_time = new Date().getTime();
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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Refresh screen
    player.show(ctx);
    for (let shield of shields) {
      shield.update(ctx);
    }
    if (!player_dying && player.lifes > 0) {
      player.enable_move(keys);
      player.enable_shoot(keys, scene.projectile_player_array);
      scene.enable_ovni(ctx, canvas.width);
      scene.enable_player_projectile_interaction(
        ctx,
        enemyMatrix,
        enemies_killed
      );
    }
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
    if (player.lifes > 0) {
      enemyMatrix.update(ctx);
    }
    if (player_dying) {
      handlePlayerDeathAnimation();

      // Check if death animation should end
      if (new Date().getTime() - player_death_time > 1500) {
        player_dying = false;
        if (player.lifes > 0) {
          player.sprite.src = "sprites/player_sprite.png";
          player.x = 122;
        }
      }
    }
    let current_enemy_step_time = new Date().getTime();
    if (!player_dying && player.lifes > 0) {
      if (
        current_enemy_step_time - old_enemy_step_time >
        400 - counter_enemies_killed * 3
      ) {
        const fast1_sound = new Audio("sounds/fastinvader1.wav");
        fast1_sound.play();
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
          const explosion_sound = new Audio("sounds/explosion.wav");
          explosion_sound.play();
          player.sprite.src = "sprites/player_death_1.png";
          player_dying = true;
          player_death_time = new Date().getTime();
          death_animation_time = player_death_time;
        }
        // Check collision with shields
        for (let shield of shields) {
          for (let j = 0; j < shield.matrix.length; j++) {
            for (let k = 0; k < shield.matrix[j].length; k++) {
              if (
                shield.matrix[j][k] === 1 &&
                projectile.y + projectile.height > shield.y + j * 7 &&
                projectile.y < shield.y + (j + 1) * 7 &&
                projectile.x + projectile.width > shield.x + k * 7 &&
                projectile.x < shield.x + (k + 1) * 7
              ) {
                enemy_projectiles.splice(i, 1); // Eliminates projectile
                shield.matrix[j][k] = 0;
                for (let l = j - 3; l < j + 3; l++) {
                  if (l >= 0 && l < shield.matrix.length) {
                    // Check if l is within bounds
                    for (let q = k - 3; q < k + 3; q++) {
                      if (q >= 0 && q < shield.matrix[l].length) {
                        // Check if q is within bounds
                        if (shield.matrix[l][q]) {
                          if (Math.random() < 0.5) {
                            shield.matrix[l][q] = 0; // Randomly destroy nearby pixels
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (player.lifes <= 0) {
      ctx.font = "60px 'Press Start 2P'";
      ctx.fillStyle = "white";
      ctx.fillText("GAME OVER", canvas.width / 2 - 250, canvas.height / 2 - 50);
      ctx.font = "30px 'Press Start 2P'";
      ctx.fillStyle = "#00ff1a";
      ctx.fillText(
        "Play again?",
        canvas.width / 2 - 150,
        canvas.height / 2 + 50
      );
      canvas.addEventListener("click", (event) => {
        if (
          event.clientX > canvas.width / 2 - 150 &&
          event.clientX < canvas.width / 2 + 150 &&
          event.clientY > canvas.height / 2 + 20 &&
          event.clientY < canvas.height / 2 + 80
        ) {
          // Reset game state
          player = new Player();
          scene = new SceneInvaders(5000);
          enemyMatrix = new EnemyMatrix();
          directionMatrix = 1;
          old_enemy_step_time = new Date().getTime();
          skin = 1;
          enemies_killed = [];
          counter_enemies_killed = 0;
          enemy_projectiles = [];
          player_dying = false;
        }
      });
    }
    console.log(directionMatrix);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
});
