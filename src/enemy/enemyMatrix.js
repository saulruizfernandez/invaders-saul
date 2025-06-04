export class EnemyMatrix {
  constructor() {
    this.matrix = [
      "aaaaaaaaaaaa",
      "bbbbbbbbbbbb",
      "bbbbbbbbbbbb",
      "cccccccccccc",
      "cccccccccccc",
    ];
  }
  kill_allien(x, y) {
    this.matrix[x][y] = "k";
  }
}
