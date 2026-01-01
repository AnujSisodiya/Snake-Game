// Select main game elements from DOM
const board = document.querySelector('.board');
const startBtn = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const gameOverModal = document.querySelector('.game-over');
const startGameModal = document.querySelector('.start-game');
const restartBtn = document.querySelector('.btn-restart');

// Select score, high score and timer elements
const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

// Block size
const blockHieght = 80;
const blockWidth = 80;

// Game variables
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let time = '00-00';

// Show high score from localStorage
highScoreElement.innerText = `${highScore}`;

// Calculate number of rows & columns based on board size
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHieght);

// Store all board blocks
const blocks = [];

// Snake initial position
let snake = [{ x: 1, y: 3 }];

// Snake direction
let direction = 'left';

// Interval IDs
let intervalId = null;
let timerIntervalId = null;

// Random food position
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols)
};

// Create grid blocks dynamically
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement('div');
    block.classList.add('block');
    board.appendChild(block);

    // Store blocks using row-col key
    blocks[`${row}-${col}`] = block;
  }
}

// Main render function – updates snake movement
function render() {
  let head = null;

  // Add food class
  blocks[`${food.x}-${food.y}`].classList.add('food');

  // Calculate new head position
  if (direction === 'left') head = { x: snake[0].x, y: snake[0].y - 1 };
  else if (direction === 'right') head = { x: snake[0].x, y: snake[0].y + 1 };
  else if (direction === 'up') head = { x: snake[0].x - 1, y: snake[0].y };
  else if (direction === 'down') head = { x: snake[0].x + 1, y: snake[0].y };

  // Wall collision detection
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    modal.style.display = 'flex';
    startGameModal.style.display = 'none';
    gameOverModal.style.display = 'flex';

    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    scoreElement.innerText = '';
    timeElement.innerText = '';
    return;
  }

  // Food collision detection
  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove('food');

    // Generate new food
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols)
    };

    blocks[`${food.x}-${food.y}`].classList.add('food');
    snake.unshift(head);
    score += 10;
    scoreElement.innerText = `${score}`;

    // Update high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore.toString());
    }
  }

  // Remove previous snake positions
  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
  });

  // Add new head and remove tail
  snake.unshift(head);
  snake.pop();

  // Draw updated snake
  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add('fill');
  });
}

// Start game button
startBtn.addEventListener('click', () => {
  modal.style.display = 'none';

  // Start snake movement
  intervalId = setInterval(() => render(), 300);

  // Start timer
  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);
    if (sec === 59) { min++; sec = 0; }
    else sec++;

    time = `${min}-${sec}`;
    timeElement.innerText = time;
  }, 1000);
});

// Restart button
restartBtn.addEventListener('click', restartGame);

// Reset everything
function restartGame() {
  document.querySelectorAll('.fill').forEach(b => b.classList.remove('fill'));
  document.querySelectorAll('.food').forEach(b => b.classList.remove('food'));

  snake = [{ x: 1, y: 3 }];
  direction = 'down';
  food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

  modal.style.display = 'none';
  intervalId = setInterval(render, 300);
}

// Keyboard controls
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') direction = 'left';
  else if (e.key === 'ArrowRight') direction = 'right';
  else if (e.key === 'ArrowUp') direction = 'up';
  else if (e.key === 'ArrowDown') direction = 'down';
});
