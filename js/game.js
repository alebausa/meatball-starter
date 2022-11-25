class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.meatball = new Player(500, 400, 70, 70);
    this.droplets = [];
    this.points = 0;
    this.generateInterval = null;
  }

  _generateDroplets() {
    // Generate new droplet every second
    this.generateInterval = setInterval(() => {
      const newDroplet = new Droplet();
      // Apply effects
      newDroplet._assignRole();
      newDroplet._assignImage();
      newDroplet._fallDown();
      // Add to the array
      this.droplets.push(newDroplet);
    }, 1000)
  }

  _drawDroplets() {
    this.droplets.forEach((elem) => {
      // Si pintamos círculos:
      // this.ctx.beginPath()
      // this.ctx.fillStyle = "black";
      // this.ctx.arc(elem.x, elem.y, elem.width, 0, 2 * Math.PI);
      // this.ctx.fill();
      // this.ctx.closePath()
      this.ctx.drawImage(elem.image, elem.x, elem.y, elem.width, elem.height);
    })
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      console.log(event.code);
      switch (event.code) {
        case 'ArrowRight':
          this.meatball.moveRight();
          break;
        case 'ArrowLeft':
          this.meatball.moveLeft();
          break;
        default:
          break;
      }
    })
  }

  _checkCollisions() {
    this.droplets.forEach((droplet) => {
      if (
        (
          // Compruebo si mi meatball está dentro de la X + width del droplet
          this.meatball.x >= droplet.x && this.meatball.x <= droplet.x + droplet.width ||
          this.meatball.x + this.meatball.width >= droplet.x && this.meatball.x + this.meatball.width <= droplet.x + droplet.width ||
          // Incluso si mi meatball es más grande que el droplet
          droplet.x >= this.meatball.x && droplet.x <= this.meatball.x + this.meatball.width
        ) &&
        (
          // Lo mismo con el eje Y
          this.meatball.y >= droplet.y && this.meatball.y <= droplet.y + droplet.height ||
          this.meatball.y + this.meatball.height >= droplet.y && this.meatball.y + this.meatball.height <= droplet.y + droplet.height ||
          droplet.y >= this.meatball.y && droplet.y <= this.meatball.y + this.meatball.height
        )
      ) {
        if (droplet.role === 'food') {
          this.meatball._increase();
          this.points++;
        } else if (droplet.role === 'poison') {
          this.meatball._decrease();
          this.points--;
        }
        if (this.points < 0) {
          this._gameOver();
        }
        let index = this.droplets.indexOf(droplet);
        this.droplets.splice(index, 1);
      }
    })
  }

  _writeScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Verdana";
    this.ctx.fillText(`Points: ${this.points}`, 850, 550);
  }

  _drawMeatball() {
    this.ctx.drawImage(this.meatball.image, this.meatball.x, this.meatball.y, this.meatball.width, this.meatball.height);
  }

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _gameOver() {
    clearInterval(this.generateInterval);
    const losePage = document.getElementById('lose-page');
    losePage.style = "display: flex";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none";
  }

  _update() {
    this._clean();
    this._drawMeatball();
    this._drawDroplets();
    this._checkCollisions();
    this._writeScore();
    // window.requestAnimationFrame(this._update.bind(this))
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._update();
    this._generateDroplets();
    this._assignControls();
  }
}