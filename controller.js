// conecta los controles y ejecuta el bucle del juego
const keys = new Set();
let previousTime = 0;

view.start.addEventListener('click', () => {
  model.start(Number(view.difficulty.value));
  view.canvas.focus();
});
view.pause.addEventListener('click', () => {
  model.state = model.state === 'playing' ? 'paused' : 'playing';
  view.canvas.focus();
});
view.finish.addEventListener('click', () => {
  model.state = 'finished';
});

view.canvas.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
    event.preventDefault();
    keys.add(event.code);
  }
});
window.addEventListener('keyup', event => keys.delete(event.code));
view.canvas.addEventListener('blur', () => keys.clear());

function loop(time) {
  const dt = Math.min((time - previousTime) / 1000, 0.05);
  previousTime = time;
  const direction = Number(keys.has('ArrowRight')) - Number(keys.has('ArrowLeft'));
  model.update(dt, direction);
  view.render(model);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
