function handleLoginForm() {
	const loginForm = document.getElementById("login-form");
	if (!loginForm) return;

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
				// Assuming the API returns a token, e.g., { token: "..." }
				if (data.token) {
					localStorage.setItem("authToken", data.token);
				}

				// On success, hide the login form and show the success message
				loginContainer.classList.add("hidden");
				successContainer.classList.remove("hidden");

				// Redirect to the homepage after a short delay
				setTimeout(() => {
					window.location.href = "/home.html";
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

function handleRegisterForm() {
	const registerForm = document.getElementById("register-form");
	if (!registerForm) return;

	registerForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const confirmPassword = document.getElementById("confirm-password").value;
		const errorDiv = document.getElementById("register-error");
		const registerContainer = document.getElementById("register-container");
		const successContainer = document.getElementById("register-success-container");

		if (password !== confirmPassword) {
			errorDiv.textContent = "Passwords do not match.";
			errorDiv.classList.remove("hidden");
			return;
		}

		fetch("https://api.acornx.app/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		})
			.then(async (response) => {
				if (response.ok) return response.json();
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || "An error occurred during registration.");
			})
			.then((data) => {
				console.log("Registration successful:", data);
				registerContainer.classList.add("hidden");
				successContainer.classList.remove("hidden");
				setTimeout(() => { window.location.href = "/profile.html"; }, 1500);
			})
			.catch((error) => {
				console.error("Registration failed:", error);
				errorDiv.textContent = error.message;
				errorDiv.classList.remove("hidden");
			});
	});
}