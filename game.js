const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 260, w: 60, h: 10 };
let food = { x: Math.random() * 360, y: 0, size: 20 };
let score = 0;
let lives = 3;
let gameOver = false;

let dx = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") dx = -5;
  if (e.key === "ArrowRight") dx = 5;

  if (e.key === "r" && gameOver) {
    score = 0;
    lives = 3;
    gameOver = false;
  }
});

document.addEventListener("keyup", () => dx = 0);

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawFood() {
  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.arc(food.x, food.y, food.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawUI() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("Lives: " + lives, 300, 20);
}

function drawGameOver() {
  ctx.fillStyle = "red";
  ctx.font = "24px Arial";
  ctx.fillText("GAME OVER", 120, 150);
  ctx.font = "16px Arial";
  ctx.fillText("Press R to Restart", 120, 180);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    player.x += dx;

    if (player.x < 0) player.x = 0;
    if (player.x + player.w > canvas.width)
      player.x = canvas.width - player.w;

    food.y += 4;

    if (food.y > canvas.height) {
      food.y = 0;
      food.x = Math.random() * 360;
      lives--;
      if (lives <= 0) gameOver = true;
    }

    if (
      food.y + food.size > player.y &&
      food.x > player.x &&
      food.x < player.x + player.w
    ) {
      score++;
      food.y = 0;
      food.x = Math.random() * 360;
    }

    drawPlayer();
    drawFood();
    drawUI();
  } else {
    drawGameOver();
  }

  requestAnimationFrame(update);
}

update();