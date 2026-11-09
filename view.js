// dibuja el juego y muestra los puntos y los controles
const view = {
  canvas: document.querySelector('#game'),
  score: document.querySelector('#score'),
  status: document.querySelector('#status'),
  start: document.querySelector('#start'),
  pause: document.querySelector('#pause'),
  finish: document.querySelector('#finish'),
  difficulty: document.querySelector('#difficulty'),

  render(game) {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.fillStyle = '#afc1d8';
    for (let i = 0; i < 45; i++) {
      ctx.fillRect((i * 137) % game.width, (i * 73) % game.height, 2, 2);
    }
    const player = game.player;
    if (game.state === 'playing') {
      ctx.fillStyle = '#ffb779';
      ctx.beginPath();
      ctx.moveTo(player.x + 14, player.y + player.height);
      ctx.lineTo(player.x + 20, player.y + player.height + 14);
      ctx.lineTo(player.x + 26, player.y + player.height);
      ctx.fill();
    }
    ctx.fillStyle = '#72e0ef';
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ecf4ff';
    ctx.fillRect(player.x + 17, player.y + 10, 6, 8);
    for (const obstacle of game.obstacles) {
      ctx.fillStyle = '#ffb779';
      ctx.beginPath();
      ctx.roundRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 8);
      ctx.fill();
      ctx.fillStyle = '#b86d43';
      ctx.beginPath();
      ctx.arc(obstacle.x + 10, obstacle.y + 10, 4, 0, Math.PI * 2);
      ctx.arc(obstacle.x + 21, obstacle.y + 22, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    this.score.textContent = game.score;
    const messages = {
      ready: 'Pulsa comenzar para jugar.',
      playing: 'Esquiva los meteoritos.',
      paused: 'Partida en pausa.',
      lost: 'Has chocado. Fin de la partida.',
      finished: 'Partida finalizada.'
    };
    if (this.status.textContent !== messages[game.state]) this.status.textContent = messages[game.state];
    const active = game.state === 'playing' || game.state === 'paused';
    this.start.disabled = active;
    this.difficulty.disabled = active;
    this.pause.disabled = !active;
    this.finish.disabled = !active;
    this.pause.textContent = game.state === 'paused' ? 'Reanudar' : 'Pausar';
  }
};
