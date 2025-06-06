import { EnemyOvni } from "./enemy/enemy.js";
import { Projectile } from "./enemy/projectile.js";

export class SceneInvaders {
  constructor(ovni_time_appearance) {
    this.ovni = null;
    this.ovni_time_appearance = ovni_time_appearance;
    this.last_time_ovni_appeared = new Date().getTime();
    this.flag_ovni_killed = false;
    this.ovni_explotion_time = null;
    this.score = 0;
    this.projectile_player_array = [];
  }
  enable_ovni(ctx, canvas_width) {
    let current_time_ovni = new Date().getTime();
    if (
      current_time_ovni - this.last_time_ovni_appeared >
      this.ovni_time_appearance
    ) {
      this.ovni = new EnemyOvni();
      const shoot_sound = new Audio("sounds/ufo_lowpitch.wav");
      shoot_sound.play();
      this.last_time_ovni_appeared = current_time_ovni;
    }
    if (this.ovni) {
      if (!this.flag_ovni_killed) this.ovni.move();
      this.ovni.show(ctx);
      if (
        this.ovni.pos_x > canvas_width ||
        this.ovni.pos_x + this.ovni.width < 0
      ) {
        this.ovni = null; // Eliminates ovni if goes ago from screen
      }
    }
  }
  enable_player_projectile_interaction(
    ctx,
    enemy_matrix,
    enemies_killed,
    shields,
    hit_shield
  ) {
    for (let i = this.projectile_player_array.length - 1; i >= 0; i--) {
      const element = this.projectile_player_array[i];
      if (element.pos_y > 0) {
        element.draw(ctx);
        element.pos_y += element.speed_y;
      } else {
        this.projectile_player_array.splice(i, 1); // Eliminates projectile
      }
      if (this.ovni) {
        if (
          element.pos_y < this.ovni.pos_y &&
          element.pos_x > this.ovni.pos_x &&
          element.pos_x < this.ovni.pos_x + this.ovni.width
        ) {
          this.projectile_player_array.splice(i, 1); // Eliminates projectile
          this.score += Math.floor(Math.random() * 100);
          const shoot_sound = new Audio("sounds/invaderkilled.wav");
          shoot_sound.play();
          this.ovni.set_img_src("sprites/enemy_ovni_explotion.png");
          this.ovni.set_width(65);
          this.ovni.set_height(65);
          this.flag_ovni_killed = true;
          this.ovni_explotion_time = new Date().getTime();
        }
      }
      let block_multiple_kill = false;
      for (let j = 0; j < enemy_matrix.matrix.length; j++) {
        for (let k = 0; k < enemy_matrix.matrix[0].length; k++) {
          if (enemy_matrix.enemy_matrix[j][k]) {
            if (
              !block_multiple_kill &&
              element.pos_y < enemy_matrix.enemy_matrix[j][k].pos_y &&
              element.pos_x > enemy_matrix.enemy_matrix[j][k].pos_x &&
              element.pos_x <
                enemy_matrix.enemy_matrix[j][k].pos_x +
                  enemy_matrix.enemy_matrix[j][k].width
            ) {
              block_multiple_kill = true; // Avoids multiple kills with the same projectile
              this.projectile_player_array.splice(i, 1); // Eliminates projectile
              this.score += enemy_matrix.enemy_matrix[j][k].points;
              enemy_matrix.enemy_matrix[j][k].set_img_src(
                "sprites/enemy_normal_explotion.png"
              );
              const kill_sound = new Audio("sounds/invaderkilled.wav");
              kill_sound.play();
              enemy_matrix.matrix[j][k] = "e"; // Exploding
              enemy_matrix.enemy_matrix[j][k].set_width(65);
              enemy_matrix.enemy_matrix[j][k].set_height(65);
              enemies_killed.push([j, k, new Date().getTime()]);
            }
          }
        }
      }
      // Check if projectile hits shields
      for (let shield of shields) {
        for (let l = 0; l < shield.matrix.length; l++) {
          for (let j = 0; j < shield.matrix[0].length; j++) {
            if (
              shield.matrix[l][j] === 1 &&
              element.pos_y < shield.y + l * 7 + 7 &&
              element.pos_y + element.height > shield.y + l * 7 &&
              element.pos_x + element.width > shield.x + j * 7 &&
              element.pos_x < shield.x + j * 7 + 7
            ) {
              this.projectile_player_array.splice(i, 1); // Eliminates projectile
              shield.matrix[l][j] = 0; // Destroys the pixel
              hit_shield = true;
              for (let p = l - 3; p < l + 3; p++) {
                if (p >= 0 && p < shield.matrix.length) {
                  // Check if p is within bounds
                  for (let q = j - 3; q < j + 3; q++) {
                    if (q >= 0 && q < shield.matrix[p].length) {
                      // Check if q is within bounds
                      if (shield.matrix[p][q]) {
                        if (Math.random() < 0.5) {
                          shield.matrix[p][q] = 0; // Randomly destroy nearby pixels
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
    return hit_shield;
  }
  enable_explotion_ovni() {
    if (this.ovni_explotion_time) {
      let c_t = new Date().getTime();
      if (c_t - this.ovni_explotion_time > 100) {
        this.ovni = null;
        this.flag_ovni_killed = false;
        this.ovni_explotion_time = null;
      }
    }
  }
  update_score(ctx) {
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE <1>", 20, 50);
    ctx.fillText(this.score, 310, 50);
  }

  update_lifes(ctx, player_lifes) {
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText("LIFES <2>", 650, 50);
    // Draw three player sprites with their id to represent lifes
    let player_sprite = new Image();
    player_sprite.src = "sprites/player_sprite.png";
    for (let i = 0; i < player_lifes; i++) {
      ctx.drawImage(player_sprite, 940 + i * 80, 10, 64, 34);
    }
  }

  enable_enemy_projectile(enemyMatrix, projectileArray, enemies_killed) {
    // Store in array the positions of the alive enemies that do not have any enemy down
    let enemy_positions = [];
    for (let i = 0; i < enemyMatrix.matrix.length; i++) {
      for (let j = 0; j < enemyMatrix.matrix[0].length; j++) {
        if (
          enemyMatrix.enemy_matrix[i][j] &&
          (enemyMatrix.matrix[i][j] != "k" ||
            enemyMatrix.matrix[i][j] != "e") &&
          !enemyMatrix.down(i, j)
        ) {
          enemy_positions.push([
            enemyMatrix.enemy_matrix[i][j].pos_x,
            enemyMatrix.enemy_matrix[i][j].pos_y,
          ]);
        }
      }
    }
    // Each enemy can shoot a projectile at any time with random probability
    for (let i = 0; i < enemy_positions.length; i++) {
      if (Math.random() < 0.0001 * enemies_killed + 0.0004) {
        // Adjust the probability as needed
        let x = enemy_positions[i][0] + 30; // Center of the enemy
        let y = enemy_positions[i][1] + 50; // Center of the enemy
        let speed = 2; // Adjust the speed as needed
        let projectile = null;
        if (Math.round(Math.random())) {
          projectile = new Projectile(
            "sprites/projectil2_1.png",
            "sprites/projectil2_2.png",
            x,
            y,
            speed
          );
        } else {
          projectile = new Projectile(
            "sprites/projectil1_1.png",
            "sprites/projectil1_2.png",
            x,
            y,
            speed
          );
        }
        projectileArray.push(projectile);
      }
    }
  }
}
