const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight;

class Particle {
	constructor() {
		this.reset();
		
		this.x = Math.random() * canvas.width
		this.y = (Math.random() - 0.5) * canvas.height * 2
	}

	reset() {
		this.x = Math.random() * -30;
		this.y = (Math.random() - 0.5) * canvas.height * 2;
		this.height = Math.random() * 10;
		this.width = this.height//Math.random() * 30
		this.speed = Math.random() * 0.1 + (canvas.width / 10000);
		this.angle = Math.random() * 30 + 10;
		this.opacity = Math.random() * 0.8;
	}

	update() {
		this.x += Math.cos((this.angle * Math.PI) / 180) * this.speed;
		this.y += Math.sin((this.angle * Math.PI) / 180) * this.speed;

		if (this.x > canvas.width + this.width || this.y > canvas.height + this.height) {
			this.reset();
		}
	}

	draw() {
		ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
		ctx.lineWidth = this.width;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(
			this.x - Math.cos((this.angle * Math.PI) / 180) * this.height,
			this.y - Math.sin((this.angle * Math.PI) / 180) * this.height,
		);
		ctx.stroke();
	}
}

let particles = [];
for (let i = 0; i < (canvas.width * canvas.height / 3000); i++) {
	particles.push(new Particle());
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach((particle) => {
		particle.update();
		particle.draw();
	});

	requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = document.documentElement.scrollHeight;
});