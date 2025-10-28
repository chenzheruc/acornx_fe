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
			const loginContainer = document.getElementById("login-container");
			const successContainer = document.getElementById("login-success-container");

			fetch("https://api.acornx.app/api/login", {
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
					// On success, hide the login form and show the success message
					loginContainer.classList.add("hidden");
					successContainer.classList.remove("hidden");

					// Redirect to the homepage after a short delay
					setTimeout(() => {
						window.location.href = "/index.html";
					}, 1500); // 1.5-second delay
				})
				.catch((error) => {
					console.error("Login failed:", error);
					// Display error message to the user
					errorDiv.textContent = error.message;
					errorDiv.classList.remove("hidden");
				});
		});
	}

	// Handle Register Form Submission
	const registerForm = document.getElementById("register-form");
	if (registerForm) {
		registerForm.addEventListener("submit", function (event) {
			event.preventDefault();

			const email = document.getElementById("email").value;
			const password = document.getElementById("password").value;
			const confirmPassword = document.getElementById("confirm-password").value;
			const errorDiv = document.getElementById("register-error");

			// Basic client-side validation
			if (password !== confirmPassword) {
				errorDiv.textContent = "Passwords do not match.";
				errorDiv.classList.remove("hidden");
				return;
			}

			fetch("https://api.acornx.app/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})
				.then(async (response) => {
					if (response.ok) {
						return response.json();
					} else {
						// Try to parse error message from API response
						const errorData = await response.json().catch(() => ({}));
						const message =
							errorData.message || "An error occurred during registration.";
						throw new Error(message);
					}
				})
				.then((data) => {
					console.log("Registration successful:", data);
					// On success, hide any previous error and redirect to login page
					errorDiv.classList.add("hidden");
					window.location.href = "/login.html"; // Redirect to login to complete the flow
				})
				.catch((error) => {
					console.error("Registration failed:", error);
					// Display error message to the user
					errorDiv.textContent = error.message;
					errorDiv.classList.remove("hidden");
				});
		});
	}
});