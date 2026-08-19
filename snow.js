const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

class Particle {
	constructor() {
		this.reset();
		this.spawn();
	}

	reset() {
		this.x = Math.random() * -30;
		this.y = (Math.random() - 0.5) * canvas.height * 2;
		this.height = Math.random() * 10;
		this.width = this.height;
		this.speed = Math.random() * 0.05;
		this.angle = Math.random() * 30 + 10;
		this.opacity = Math.random() * 0.2;
	}

	update() {
		let speedMultiplier = (canvas.width / 25000)

		this.x += Math.cos((this.angle * Math.PI) / 180) * (this.speed + speedMultiplier);
		this.y += Math.sin((this.angle * Math.PI) / 180) * (this.speed + speedMultiplier);

		if (this.isOffscreen()) {
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

	spawn() {
		this.x = Math.random() * canvas.width;
		this.y = (Math.random() - 0.5) * canvas.height * 2;
	}

	isOffscreen() {
		return (this.x > canvas.width + this.width || this.y > canvas.height + this.height);
	}
}

async function updateCanvasSize() {
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	await new Promise(r => setTimeout(r, 50));
	canvas.height = document.documentElement.scrollHeight;

	createParticles();
}

function createParticles() {
	const targetParticles = Math.floor((canvas.width * canvas.height) / 3000);

	while (particles.length > targetParticles) {
		particles.pop();
	}

	particles.forEach((particle) => {
		if (particle.isOffscreen()) {
			particle.spawn();
		}
	});

	while (particles.length < targetParticles) {
		particles.push(new Particle());
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach((particle) => {
		particle.update();
		particle.draw();
	});

	requestAnimationFrame(animate);
}

updateCanvasSize();
createParticles();

animate();

window.addEventListener("resize", () => {
	updateCanvasSize();
});