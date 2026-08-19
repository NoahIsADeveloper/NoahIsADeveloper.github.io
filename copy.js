// Powers the copy buttons in the Crypto and Keys cards.
function copyMono(button) {
	const row = button.closest(".mono-row");
	const value = row.querySelector(".mono-value").textContent.trim();

	const done = () => {
		const original = button.textContent;
		button.textContent = "✓";
		button.classList.add("copied");
		setTimeout(() => {
			button.textContent = original;
			button.classList.remove("copied");
		}, 1200);
	};

	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard.writeText(value).then(done).catch(() => fallbackCopy(value, done));
	} else {
		fallbackCopy(value, done);
	}
}

// Fallback for browsers/contexts without the async Clipboard API
function fallbackCopy(text, onDone) {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	document.body.appendChild(textarea);
	textarea.select();
	try {
		document.execCommand("copy");
		onDone();
	} catch (err) {
		console.error("Copy failed:", err);
	}
	document.body.removeChild(textarea);
}