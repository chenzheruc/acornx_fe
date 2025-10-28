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
	loadHTML("navigation-home-placeholder", "/navigation_home.html");
	loadHTML("footer-placeholder", "/footer.html")

	// Initialize form handlers from auth.js
	if (typeof handleLoginForm === "function") handleLoginForm();
	if (typeof handleRegisterForm === "function") handleRegisterForm();
});