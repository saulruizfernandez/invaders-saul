import { Enemy1, Enemy2, Enemy3 } from "./enemy.js";

export class EnemyMatrix {
  constructor(row_spacing = 70, col_spacing = 100) {
    this.matrix = [
      "aaaaaaaaaa",
      "bbbbbbbbbb",
      "bbbbbbbbbb",
      "cccccccccc",
      "cccccccccc",
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
  }
  kill_allien(x, y) {
    this.matrix[x][y] = "k";
  }
  update(ctx) {
    let current_row = 160;
    for (let i = 0; i < this.matrix.length; i++) {
      this.col = 60;
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
            break;
        }
        this.col += this.col_spacing;
      }
      current_row += this.row_spacing;
    }
  }
}
