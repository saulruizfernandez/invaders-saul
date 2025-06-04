import { EnemyOvni } from "./enemy/enemy.js";

export class SceneInvaders {
  constructor(ovni_time_appearance) {
    this.ovni = null;
    this.ovni_time_appearance = ovni_time_appearance;
    this.last_time_ovni_appeared = new Date().getTime();
    this.flag_ovni_killed = false;
  }
  enable_ovni(ctx, canvas) {
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
        this.ovni.pos_x > canvas.width ||
        this.ovni.pos_x + this.ovni.width < 0
      ) {
        this.ovni = null; // Eliminates ovni if goes ago from screen
      }
    }
  }
}
