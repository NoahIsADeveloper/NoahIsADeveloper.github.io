const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight;

let particles = [];

class Particle {
	constructor() {
		this.reset();
		
		// Teleport it to a random location after it first loads
		this.spawn();
	}

	// Used to reset the particle after it goes offscreen
	reset() {
		this.x = Math.random() * -30;
		this.y = (Math.random() - 0.5) * canvas.height * 2;
		this.height = Math.random() * 10;
		this.width = this.height;
		this.speed = Math.random() * 0.1;
		this.angle = Math.random() * 30 + 10;
		this.opacity = Math.random() * 0.8;
	}

	// Used to update the position of the particle every frame
	update() {
		// Adds movement speed based on screen height for bigger screens
		let speedMultiplier = (canvas.width / 10000)

		// Move in the direction the particle is pointing in
		this.x += Math.cos((this.angle * Math.PI) / 180) * (this.speed + speedMultiplier);
		this.y += Math.sin((this.angle * Math.PI) / 180) * (this.speed + speedMultiplier);

		// Reset the particle if it goes too far to the right or too far down
		if (this.isOffscreen()) {
			this.reset();
		}
	}

	// Used to render/draw the particle every frame
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

	// Used to teleport the particle to a random location
	spawn() {
		this.x = Math.random() * canvas.width;
		this.y = (Math.random() - 0.5) * canvas.height * 2;
	}

	// Used to check if the particle is offscreen
	isOffscreen() {
		return (this.x > canvas.width + this.width || this.y > canvas.height + this.height);
	}
}

// Used to create the particles (amount scales based on screen size)
function createParticles() {
	const targetParticles = Math.floor((canvas.width * canvas.height) / 3000);

	while (particles.length > targetParticles) {
		particles.pop();
	}

	// Respawn offscreen particles after resize
	particles.forEach((particle) => {
		if (particle.isOffscreen()) {
			particle.spawn()
		}
	});

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

// Start the loop
animate();

// Resize the canvas object
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = document.documentElement.scrollHeight;

	// Remove useless particles when the window shrinks
	// or add more particles when the window grow
	createParticles();
});