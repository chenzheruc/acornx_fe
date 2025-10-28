tailwind.config = {
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "#3db8f5",
				"background-light": "#f8fbfc",
				"background-dark": "#101c22",
			},
			fontFamily: {
				display: ["Plus Jakarta Sans", "Noto Sans", "sans-serif"],
			},
			borderRadius: {
				DEFAULT: "0.5rem",
				lg: "1rem",
				xl: "1.5rem",
				full: "9999px",
			},
		},
	},
};

document.addEventListener("DOMContentLoaded", function () {
	// Function to load HTML content into a placeholder
	function loadHTML(elementId, url) {
		const element = document.getElementById(elementId);
		if (element) {
			fetch(url)
				.then((response) => response.text())
				.then((html) => {
					element.outerHTML = html; // Replace the placeholder with the loaded HTML
				})
				.catch((error) => console.error(`Error loading ${url}:`, error));
		}
	}

	// Load shared components
	loadHTML("navigation-placeholder", "/navigation.html");
	loadHTML("footer-placeholder", "/footer.html");

	// Handle Login Form Submission
	const loginForm = document.getElementById("login-form");
	if (loginForm) {
		loginForm.addEventListener("submit", function (event) {
			event.preventDefault(); // Prevent the default form submission

			const email = document.getElementById("email-address").value;
			const password = document.getElementById("password").value;
			const errorDiv = document.getElementById("login-error");

			fetch("https://api.acornx.app/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})
				.then((response) => {
					if (response.ok) {
						return response.json(); // or response.text() if the API returns text
					} else {
						// Handle HTTP errors (e.g., 401, 404, 500)
						throw new Error("Invalid email or password.");
					}
				})
				.then((data) => {
					console.log("Login successful:", data);
					// On success, hide any previous error and redirect
					errorDiv.classList.add("hidden");
					window.location.href = "/profile.html"; // Redirect to the profile page
				})
				.catch((error) => {
					console.error("Login failed:", error);
					// Display error message to the user
					errorDiv.textContent = error.message;
					errorDiv.classList.remove("hidden");
				});
		});
	}
});