import { Enemy1, Enemy2, Enemy3 } from "./enemy.js";

export class EnemyMatrix {
  constructor(row_spacing = 70, col_spacing = 100) {
    this.matrix = [
      "aaaaaaaaaa".split(""),
      "bbbbbbbbbb".split(""),
      "bbbbbbbbbb".split(""),
      "cccccccccc".split(""),
      "cccccccccc".split(""),
    ];
    this.enemy_matrix = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    this.row_spacing = row_spacing;
    this.col_spacing = col_spacing;
    this.col;
    this.speed = 10;
    this.direction = 1;
    this.pos_x;
  }
  kill_allien(x, y) {
    this.matrix[x][y] = "k";
  }
  update(ctx) {
    let current_row = 160;
    for (let i = 0; i < this.matrix.length; i++) {
      this.col = 60;
      if (i == 0) {
        this.col += 10.5;
      } else if (i == 1 || i == 2) {
        this.col += 1;
      }
      for (let j = 0; j < this.matrix[0].length; j++) {
        switch (this.matrix[i][j]) {
          case "a":
            if (!this.enemy_matrix[i][j])
              this.enemy_matrix[i][j] = new Enemy1(
                50,
                "sprites/enemy3_1.png",
                52,
                51,
                this.col,
                current_row
              );
            this.enemy_matrix[i][j].show(ctx);
            break;
          case "b":
            if (!this.enemy_matrix[i][j])
              this.enemy_matrix[i][j] = new Enemy2(
                30,
                "sprites/enemy1_1.png",
                71,
                52,
                this.col,
                current_row
              );
            this.enemy_matrix[i][j].show(ctx);
            break;
          case "c":
            if (!this.enemy_matrix[i][j])
              this.enemy_matrix[i][j] = new Enemy3(
                10,
                "sprites/enemy2_1.png",
                73,
                52,
                this.col,
                current_row
              );
            this.enemy_matrix[i][j].show(ctx);
            break;
          case "k":
            this.enemy_matrix[i][j] = null;
            break;
          default:
            this.enemy_matrix[i][j].show(ctx);
            break;
        }
        this.col += this.col_spacing;
      }
      current_row += this.row_spacing;
    }
  }
  move(canva_width) {
    let should_change_direction = false;
    let leftmost = Infinity;
    let rightmost = -Infinity;
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.enemy_matrix[i][j]) {
          leftmost = Math.min(leftmost, this.enemy_matrix[i][j].pos_x);
          rightmost = Math.max(
            rightmost,
            this.enemy_matrix[i][j].pos_x + this.enemy_matrix[i][j].width
          );
        }
      }
    }
    if (rightmost >= canva_width - 15 || leftmost <= 15) {
      this.direction *= -1;
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[0].length; j++) {
          if (this.enemy_matrix[i][j]) {
            this.enemy_matrix[i][j].pos_y += 10;
          }
        }
      }
    }

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.enemy_matrix[i][j]) {
          this.enemy_matrix[i][j].pos_x += this.speed * this.direction;
        }
      }
    }
  }
  change_skin(skin) {
    if (skin == 1) {
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[0].length; j++) {
          if (this.enemy_matrix[i][j]) {
            switch (this.matrix[i][j]) {
              case "a":
                this.enemy_matrix[i][j].set_img_src("sprites/enemy3_2.png");
                break;
              case "b":
                this.enemy_matrix[i][j].set_img_src("sprites/enemy1_2.png");
                break;
              case "c":
                this.enemy_matrix[i][j].set_img_src("sprites/enemy2_2.png");
                break;
              default:
                break;
            }
          }
        }
      }
    } else if (skin == -1) {
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[0].length; j++) {
          if (this.enemy_matrix[i][j]) {
            switch (this.matrix[i][j]) {
              case "a":
                this.enemy_matrix[i][j].set_img_src("sprites/enemy3_1.png");
                break;
              case "b":
                this.enemy_matrix[i][j].set_img_src("sprites/enemy1_1.png");
                break;
              case "c":
                this.enemy_matrix[i][j].set_img_src("sprites/enemy2_1.png");
                break;
              default:
                break;
            }
          }
        }
      }
    }
  }
}
