const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

function jump() {
  mario.classList.add('jump');
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

function checkCollision() {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 50 && pipePosition > 0 && marioPosition < 80) {
    stopGame();
  }
}

function checkCollision() {
  const MAX_WIDTH = 768;
  const pipePosition = pipe.offsetLeft * (window.innerWidth / MAX_WIDTH);
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '') * (window.innerWidth / MAX_WIDTH);

  if (pipePosition <= 30 && pipePosition > 0 && marioPosition < 30) {
    stopGame();
  }
}
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  document.addEventListener('touchstart', jump);
}

function stopGame() {
  pipe.style.animation = 'none';
  pipe.style.left = `${pipe.offsetLeft}px`;

  const clouds = document.querySelectorAll('.cloud, .clouds, .bad');
  clouds.forEach(cloud => {
    cloud.style.animation = 'none';
    cloud.style.left = `${cloud.offsetLeft}px`;
  });

  mario.style.animation = 'none';
  mario.style.bottom = `${mario.style.bottom}`;
  mario.src= 'imagens/loser.png';
  mario.style.width = '40px';

  clearInterval(loop);
}

const loop = setInterval(() => {
  checkCollision();
}, 10);

document.addEventListener('keydown', jump);
