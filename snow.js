const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight;

class Particle {
	constructor() {
		this.reset();
		
		// Teleport them to a random location after it first loads
		this.spawn();
	}

	// Runs after it goes offscreen
	reset() {
		this.x = Math.random() * -30;
		this.y = (Math.random() - 0.5) * canvas.height * 2;
		this.height = Math.random() * 10;
		this.width = this.height;
		this.speed = Math.random() * 0.1;
		this.angle = Math.random() * 30 + 10;
		this.opacity = Math.random() * 0.8;
	}

	// Update the position every frame
	update() {
		let speedMultiplier = (canvas.width / 2000)

		this.x += Math.cos((this.angle * Math.PI) / 180) * this.speed * speedMultiplier;
		this.y += Math.sin((this.angle * Math.PI) / 180) * this.speed * speedMultiplier;

		// Reset after going offscreen through the bottom/far right
		if (this.isOffscreen()) {
			this.reset();
		}
	}

	// Draws the particle
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

	// Teleport to a random location
	spawn() {
		this.x = Math.random() * canvas.width;
		this.y = (Math.random() - 0.5) * canvas.height * 2;
	}

	// Offscreen check
	isOffscreen() {
		return (this.x > canvas.width + this.width || this.y > canvas.height + this.height);
	}
}

// Creates the particles (scales based on screen size)
let particles = [];
function createParticles() {
	const targetParticles = Math.floor((canvas.width * canvas.height) / 3000);

	while (particles.length > targetParticles) {
		particles.pop();
	}

	while (particles.length < targetParticles) {
		particles.push(new Particle());
	}
}

// Loop to draw and update the particles
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach((particle) => {
		particle.update();
		particle.draw();
	});

	requestAnimationFrame(animate);
}

// Creates the particles
createParticles();

// Run the loop
animate();

// Resize the canvas object
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = document.documentElement.scrollHeight;

	// Remove useless particles when the window shrinks
	// and add more particles when the window grow
	createParticles();
});