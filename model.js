// guarda el estado y calcula el movimiento y las colisiones
const model = {
  width: 600,
  height: 400,
  state: 'ready',
  score: 0,
  speed: 240,
  elapsed: 0,
  player: { x: 280, y: 350, width: 40, height: 24 },
  obstacles: [],

  start(speed) {
    this.state = 'playing';
    this.score = 0;
    this.speed = speed;
    this.elapsed = 0;
    this.player.x = 280;
    this.obstacles = [];
  },

  update(dt, direction) {
    if (this.state !== 'playing') return;
    const player = this.player;
    player.x = Math.max(0, Math.min(this.width - player.width, player.x + direction * 360 * dt));
    this.elapsed += dt;
    if (this.elapsed >= 0.8) {
      this.elapsed -= 0.8;
      this.obstacles.push({ x: Math.random() * 570, y: -30, width: 30, height: 30 });
    }
    for (const obstacle of this.obstacles) {
      obstacle.y += this.speed * dt;
      if (player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y) {
        this.state = 'lost';
        return;
      }
    }
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.y > this.height) {
        this.score++;
        return false;
      }
      return true;
    });
  }
};

