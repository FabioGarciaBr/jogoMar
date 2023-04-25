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
  const MAX_WIDTH = 900;
  const pipePosition = pipe.offsetLeft * (window.innerWidth / MAX_WIDTH);
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '') * (window.innerWidth / MAX_WIDTH);

  if (pipePosition <= 30 && pipePosition > 0 && marioPosition < 30) {
    stopGame();
  }
}
const isMobile = window.matchMedia("(max-width: 900px)").matches;

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


// elemento de botão
const reloadBtn = document.createElement('button');

//texto do botão
reloadBtn.innerText = 'Recarregar';

// estilo do botão
reloadBtn.style.padding = '10px';
reloadBtn.style.backgroundColor = '#4CAF50';
reloadBtn.style.color = 'white';
reloadBtn.style.border = 'none';
reloadBtn.style.borderRadius = '5px';
reloadBtn.style.cursor = 'pointer';


reloadBtn.addEventListener('click', function() {
  location.reload();
});


document.body.appendChild(reloadBtn);

