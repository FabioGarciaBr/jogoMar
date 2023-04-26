const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloudbad = document.querySelector('.cloudbad');

//pulo
function jump() {
  mario.classList.add('jump');
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);

  const cloudbadPosition = +window.getComputedStyle(cloudbad).left.replace('px', '');
  if (cloudbadPosition <= 30 && cloudbadPosition > 0) {
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
  clearInterval(loop); // Para o loop de verificação de colisão
  pipe.classList.add('paused'); // Pausa a animação do cano
  pipe.style.left = `${pipe.offsetLeft}px`;
  mario.classList.add('paused'); // Pausa a animação do Mario
  mario.style.bottom = `${mario.style.bottom}`;
  mario.src= 'imagens/loser.png';
  mario.style.width = '40px';

  const clouds = document.querySelectorAll('.cloud, .clouds, .cloudbad');
  clouds.forEach(cloud => {
    cloud.style.animation = 'none';
    cloud.style.left = `${cloud.offsetLeft}px`;
  });
  
  // Pare o autoplay do elemento de áudio
  var meuAudio = document.getElementById("meuAudio");
  meuAudio.pause();

  // Exibe a mensagem de derrota
  const gameOver = document.createElement('div');
  gameOver.classList.add('game-over');
  gameOver.innerHTML = '<img src="imagens/loser.png" width="40"><p>Você perdeu!</p><button onclick="location.reload()">Jogar novamente</button>';
  document.body.appendChild(gameOver);
  gameOver.style.position = 'absolute';
  gameOver.style.left = '50%';
  gameOver.style.top = '50%';
  gameOver.style.transform = 'translate(-50%, -50%)';

;

}
const loop = setInterval(() => {
  checkCollision();
}, 10);

document.addEventListener('keydown', jump);
