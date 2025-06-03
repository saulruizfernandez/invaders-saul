// 00ff1a -> color of green

export class Player {
  constructor(
    speed = 5,
    mov_x = 0,
    pos_x = 570,
    lifes = 3,
    img_src = "sprites/player_sprite.png",
    width = 96,
    height = 51
  ) {
    this.speed = speed;
    this.mov_x = mov_x;
    this.pos_x = pos_x;
    this.lifes = lifes;
    this.sprite = new Image();
    this.sprite.src = img_src;
    this.width = width;
    this.height = height;
  }
}
