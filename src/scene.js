import { EnemyOvni } from "./enemy/enemy.js";

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
  enable_player_projectile_interaction(ctx, enemy_matrix, enemies_killed) {
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
          this.ovni.set_img_src("sprites/enemy_ovni_explotion.png");
          this.ovni.set_width(65);
          this.ovni.set_height(65);
          this.flag_ovni_killed = true;
          this.ovni_explotion_time = new Date().getTime();
        }
      }
      for (let j = 0; j < enemy_matrix.matrix.length; j++) {
        for (let k = 0; k < enemy_matrix.matrix[0].length; k++) {
          if (enemy_matrix.enemy_matrix[j][k]) {
            if (
              element.pos_y < enemy_matrix.enemy_matrix[j][k].pos_y &&
              element.pos_x > enemy_matrix.enemy_matrix[j][k].pos_x &&
              element.pos_x <
                enemy_matrix.enemy_matrix[j][k].pos_x +
                  enemy_matrix.enemy_matrix[j][k].width
            ) {
              this.projectile_player_array.splice(i, 1); // Eliminates projectile
              this.score += enemy_matrix.enemy_matrix[j][k].points;
              enemy_matrix.enemy_matrix[j][k].set_img_src(
                "sprites/enemy_normal_explotion.png"
              );
              enemy_matrix.matrix[j][k] = "e"; // Exploding
              enemy_matrix.enemy_matrix[j][k].set_width(65);
              enemy_matrix.enemy_matrix[j][k].set_height(65);
              enemies_killed.push([j, k, new Date().getTime()]);
            }
          }
        }
      }
    }
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
    ctx.fillText(this.score, 20, 90);
  }
}
