const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
let result = 0;

const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 800;
CANVAS_HEIGHT = canvas.height = 600;
const numberOfEnemies = 30;
const enemiesArray = [];
let currentTime = 60;

const pngFiles = [
    'enemy1.png',
    'enemy2.png',
    'enemy3.png',
    'enemy4.png',
    'enemy5.png',
    'enemy6.png',
    'enemy7.png',
    'enemy8.png',
    'enemy9.png',
    'enemy10.png',
    'enemy11.png',
    'enemy12.png',
    'enemy13.png',
    'enemy14.png',
    'enemy15.png',
]

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'png/enemy1.png'
        this.x = Math.random() * canvas.width + canvas.width;
        this.y = Math.random() * canvas.height;

        this.speed = Math.random() * 3 + 1;
        this.imageWidth = 260;
        this.imageHeight = 195;
        this.width = this.imageWidth / 4;
        this.height = this.imageHeight / 4;
        this.currentFrame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
    }
    update() {
        this.x += this.speed;
        this.y += Math.sin(this.angle);
        this.angle += this.angleSpeed;

        if (this.x > canvas.width + this.width) {
            this.x = 0 - this.width;
            this.y = Math.random() * canvas.height;
        };
        if (this.y + this.height < 0) {
            this.y = canvas.height;
        } else if (this.y > canvas.height) {
            this.y = 0 - this.height;
        }
        if (gameFrame % this.flapSpeed === 0) {
            this.currentFrame = (this.currentFrame + 1) % pngFiles.length;
        }
    }
    draw() {
        const currentImage = new Image;
        currentImage.src = 'png/' + pngFiles[this.currentFrame];
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(currentImage, this.x, this.y, this.width, this.height);

    }

}
for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy)
}
console.log(enemiesArray);


function animate() {
   
    if (currentTime > 0) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        enemiesArray.forEach(enemy => {
            enemy.update();
            enemy.draw();
        })
        
        requestAnimationFrame(animate);
    }
}
animate();

canvas.addEventListener('mousedown', (event) => {
    const mouseX = event.x - canvas.getBoundingClientRect().left;
    const mouseY = event.y - canvas.getBoundingClientRect().top;

    enemiesArray.forEach(enemy => {
        if (
            mouseX > enemy.x &&
            mouseX < enemy.x + enemy.width &&
            mouseY > enemy.y &&
            mouseY < enemy.y + enemy.height
        ) {
            // "Вбиваємо" ворога
            enemy.x = Math.random() * canvas.width + canvas.width;
            enemy.y = Math.random() * canvas.height;
            result += 1;
            score.textContent = result;
        }
    });
});

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        alert('GAME OVER! Your final score is' + result);
        clearCanvas();
    }
}
let countDownTimerId = setInterval(countDown, 1000);

function clearCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}