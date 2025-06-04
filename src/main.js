import { Player } from "./player/player.js";
import { SceneInvaders } from "./scene.js";
import { keys } from "./keyboardInteraction.js";

// Canvas config
const canvas = document.getElementById("game_canvas");
canvas.width = 1200;
canvas.height = 800;
const ctx = canvas.getContext("2d");

// Create player
export let player = new Player();
let projectile_player_array = [];
let score = 0;

// Create scene
let scene = new SceneInvaders();

// Red ovni variables
let old_time_explotion_ovni = null;

document.fonts.ready.then(() => {
  function update() {
    player.enable_move(keys);
    player.enable_shoot(keys, projectile_player_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Refresh screen
    player.show(ctx);
    scene.enable_ovni(ctx);

    for (let i = projectile_player_array.length - 1; i >= 0; i--) {
      const element = projectile_player_array[i];
      if (element.pos_y > 0) {
        element.draw(ctx);
        element.pos_y += element.speed_y;
      } else {
        projectile_player_array.splice(i, 1); // Eliminates projectile
      }
      if (ovni) {
        if (
          element.pos_y < 100 &&
          element.pos_x > ovni.pos_x &&
          element.pos_x < ovni.pos_x + ovni.width
        ) {
          projectile_player_array.splice(i, 1); // Eliminates projectile
          score += Math.floor(Math.random() * 100);
          ctx.fillText(score, ovni.pos_x, ovni.pos_y);
          ovni.set_img_src("sprites/enemy_ovni_explotion.png");
          ovni.set_width(65);
          ovni.set_width(65);
          flag_ovni_killed = true;
          old_time_explotion_ovni = new Date().getTime();
        }
      }
    }

    if (old_time_explotion_ovni) {
      let c_t = new Date().getTime();
      if (c_t - old_time_explotion_ovni > 100) {
        ovni = null;
        flag_ovni_killed = false;
        old_time_explotion_ovni = null;
      }
    }

    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE <1>", 20, 50);
    ctx.fillText(score, 20, 90);

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
});
