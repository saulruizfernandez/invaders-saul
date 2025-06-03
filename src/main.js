import { Player } from "./player/player.js";
import { keys } from "./keyboardInteraction.js";
import { Projectile } from "./projectile/projectile.js";
import { EnemyOvni } from "./enemy/enemy.js";

const canvas = document.getElementById("game_canvas");
canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext("2d");
ctx.font = "100px 'Press Start 2P'";

export let player = new Player();

let projectile_array = [];

let threshold_projectile = 350;
let ovni_time_appearance = 5000;

let old_time = new Date().getTime();
let old_time_ovni = new Date().getTime();

let ovni = null;
let flag_ovni_killed = false;
let o_t = null;

let score = 0;

document.fonts.ready.then(() => {
  function update() {
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = "white";
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
    ctx.drawImage(
      player.sprite,
      player.pos_x,
      720,
      player.width,
      player.height
    );

    let current_time_ovni = new Date().getTime();
    if (current_time_ovni - old_time_ovni > ovni_time_appearance) {
      ovni = new EnemyOvni();
      old_time_ovni = current_time_ovni;
    }

    if (ovni) {
      if (!flag_ovni_killed) ovni.pos_x += ovni.speed_x;
      ctx.drawImage(ovni.sprite, ovni.pos_x, 100, ovni.width, ovni.height);
      if (ovni.pos_x > canvas.width || ovni.pos_x + ovni.width < 0) {
        ovni = null; // Eliminates ovni if goes ago from screen
      }
    }

    for (let i = projectile_array.length - 1; i >= 0; i--) {
      const element = projectile_array[i];
      if (element.pos_y > 0) {
        element.draw(ctx);
        element.pos_y += element.speed_y;
      } else {
        projectile_array.splice(i, 1); // Eliminates projectile
      }
      if (ovni) {
        if (
          element.pos_y < 100 &&
          element.pos_x > ovni.pos_x &&
          element.pos_x < ovni.pos_x + ovni.width
        ) {
          projectile_array.splice(i, 1); // Eliminates projectile
          score += Math.floor(Math.random() * 100);
          ctx.fillText(score, ovni.pos_x, ovni.pos_y);
          ovni.set_img_src("sprites/enemy_ovni_explotion.png");
          ovni.set_width(65);
          ovni.set_width(65);
          flag_ovni_killed = true;
          o_t = new Date().getTime();
        }
      }
    }

    if (o_t) {
      let c_t = new Date().getTime();
      if (c_t - o_t > 100) {
        ovni = null;
        flag_ovni_killed = false;
        o_t = null;
      }
    }

    ctx.fillText("SCORE <1>", 20, 50);
    ctx.fillText(score, 20, 90);

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
});
