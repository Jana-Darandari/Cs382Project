// --- MASTER SESSION CONTROLLER ---
const Session = {
    name: 'Operator',
    score: 0,
    
    init: function() {
        const urlParams = new URLSearchParams(window.location.search);
        this.name = urlParams.get('name') || 'Operator';
        this.score = parseInt(urlParams.get('score')) || 0;
        this.updateDisplay();
    },
    
    updateDisplay: function() {
        if ($('#score-display').length) $('#score-display').text(`Score: ${this.score}`);
    },
    
    addScore: function(points) {
        this.score += points;
        this.updateDisplay();
    },

    subtractScore: function(points) {
        this.score = Math.max(0, this.score - points);
        this.updateDisplay();
    },
    
    goToNextStage: function(nextStageNum) {
        window.location.href = `index.html?stage=${nextStageNum}&name=${encodeURIComponent(this.name)}&score=${this.score}`;
    },

    returnToHub: function(currentStageNum) {
        window.location.href = `index.html?stage=${currentStageNum}&name=${encodeURIComponent(this.name)}&score=${this.score}`;
    },

    failHeist: function() {
        window.location.href = `index.html?stage=fail&name=${encodeURIComponent(this.name)}&score=${this.score}`;
    }
};

$(document).ready(() => Session.init());

// --- BACKGROUND DUST SYSTEM ---
const canvas = document.getElementById('dust-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

class DustParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 + 0.5; 
        this.speedY = (Math.random() - 0.5) * 1; 
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) { this.x = 0; this.y = Math.random() * canvas.height; }
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(212, 136, 51, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) particlesArray.push(new DustParticle());

function animateDust() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateDust);
}
animateDust();