class Player {
  constructor(x, y, width, height) {
    this.image = meatball;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  moveRight() {
    this.x = this.x + 15;
    if (this.x > 1000) {
      this.x = 0 - this.width;
    }
  }

  moveLeft() {
    this.x = this.x - 15;
    if (this.x + this.width < 0) {
      this.x = 1000;
    }
  }

  _increase() {
    this.width = this.width + 15;
    this.height = this.height + 15;
    this.y = this.y - 15;
  }

  _decrease() {
    this.width = this.width - 15;
    this.height = this.height - 15;
    this.y = this.y + 15;
  }
}