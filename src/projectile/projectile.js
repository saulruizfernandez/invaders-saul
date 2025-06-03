export class Projectile {
  constructor(pos_x, speed_y = -10, pos_y = 710, width = 5, height = 12) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.speed_y = speed_y;
    this.width = width;
    this.height = height;
  }
  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.pos_x, this.pos_y, this.width, this.height);
  }
}
