class Enemy {
  constructor(
    points,
    img_src = "sprites/enemy_ovni.png",
    width = 96,
    height = 51
  ) {
    this.points = points;
    this.sprite = new Image();
    this.sprite.src = img_src;
    this.width = width;
    this.height = height;
  }
  set_img_src(img_src) {
    this.sprite.src = img_src;
  }
  set_width(width) {
    this.width = width;
  }
  set_height(height) {
    this.height = height;
  }
}

export class EnemyOvni extends Enemy {
  constructor(
    points,
    img_src = "sprites/enemy_ovni.png",
    width = 102,
    height = 44,
    speed_x = 2
  ) {
    super(points, img_src, width, height);
    this.direction = Math.round(Math.random());
    this.pos_x = this.direction == 0 ? -102 : 1200;
    this.speed_x = this.direction == 0 ? speed_x : -speed_x;
  }
}
