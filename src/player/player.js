// 00ff1a -> color of green

import { Projectile } from "../projectile/projectile.js";

export class Player {
  constructor(
    speed = 5,
    x = 570,
    y = 720,
    lifes = 3,
    img_src = "sprites/player_sprite.png",
    width = 96,
    height = 51
  ) {
    this.speed = speed;
    this.mov_x = 0;
    this.x = x;
    this.y = y;
    this.lifes = lifes;
    this.sprite = new Image();
    this.sprite.src = img_src;
    this.width = width;
    this.height = height;
    this.last_shoot_time = new Date().getTime();
    this.shooting_interval = 350; // Shooting frequency
    this.lifes = 3;
  }

  show(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  enable_move(keys) {
    if (keys["ArrowRight"]) this.mov_x = this.speed;
    else if (keys["ArrowLeft"]) this.mov_x = -this.speed;
    else this.mov_x = 0;
    this.x += this.mov_x;
    if (this.x < 5) this.x = 5;
    if (this.x > 1099) this.x = 1099;
  }

  enable_shoot(keys, projectile_player_array, hit_shield) {
    if (keys[" "]) {
      let current_time = new Date().getTime();
      if (
        current_time - this.last_shoot_time > this.shooting_interval ||
        hit_shield
      ) {
        const shoot_sound = new Audio("sounds/shoot.wav");
        shoot_sound.play();
        projectile_player_array.push(new Projectile(this.x + 45.5));
        this.last_shoot_time = current_time;
        hit_shield = false;
      }
      return hit_shield;
    }
  }
}
