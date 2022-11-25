class Droplet {
  constructor() {
    this.x = Math.floor(Math.random() * 950);
    this.y = Math.floor(Math.random() * -100);
    this.width = 50;
    this.height = 50;
    this.role = null;
    this.image = null;
    this.fallInterval = undefined;
  }

  _fallDown() {
    this.fallInterval = setInterval(() => {
      if (this.y > 600) {
        clearInterval(this.fallInterval);
      }
      this.y = this.y + 1;
    }, 10)
  }

  _assignRole() {
    // Una manera de hacer proporción de malos vs. buenos
    if (Math.floor(Math.random() * 3) > 1) {
      this.role = 'poison';
    } else {
      this.role = 'food';
    }
  }

  _assignImage() {
    // En función del rol asigno una imagen
    // Siempre tendrá que ser llamado después del _assignRole, si no, no tiene rol
    if (this.role === 'poison') {
      this.image = windows;
    } else {
      this.image = foodImages[Math.floor(Math.random() * foodImages.length)];
    }
  }
}