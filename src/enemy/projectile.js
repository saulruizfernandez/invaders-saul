export class Projectile {
  constructor(sprite1, sprite2, x, y, speed) {
    this.sprite1 = sprite1;
    this.sprite2 = sprite2;
    this.image = new Image();
    this.image.src = sprite2;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.old_skin_time = new Date().getTime();
    this.skin = 1;
    this.width = 10;
    this.height = 20;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  move() {
    this.y += this.speed;
    let current_time = new Date().getTime();
    if (current_time - this.old_skin_time > 60) {
      if (this.skin == 1) {
        this.image.src = this.sprite1;
      } else {
        this.image.src = this.sprite2;
      }
      this.skin *= -1;
      this.old_skin_time = current_time;
    }
  }
}
