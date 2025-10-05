async function updateMovie(subgenre) {
    try {
        const response = await fetch("assets/horror_advent_calendar_full.json");
        const calendar = await response.json();

        // TEMP: manual date for testing
        //const today = "Oct 31"; // change to any date in your JSON
        const now = new Date();
        const options = { month: "short", day: "numeric" };
        const today = now.toLocaleDateString("en-US", options);

        const todayEntry = calendar.find(entry => entry.date === today);
        if (!todayEntry) return;

        const genreKey = subgenre.toLowerCase() === "scary" ? "scary" : "fun";
        const movieData = todayEntry[genreKey];
        if (!movieData) return;

        const titleEl = document.getElementById("movieTitle");
        const infoEl = document.getElementById("movieInfo");

        if (titleEl) titleEl.textContent = movieData.title;
        if (infoEl) infoEl.textContent = movieData.description;

    } catch (err) {
        console.error("Error loading or processing JSON:", err);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const lightSwitch = document.getElementById("lightSwitch");
    const darkOverlay = document.querySelector(".dark-overlay");

    if (!lightSwitch) return;

    const currentPath = window.location.pathname;
    let subgenre = "fun";
    let nextPage = "off.html";

    if (currentPath.endsWith("off.html")) {
        subgenre = "scary";
        nextPage = "index.html";

        // Show dark overlay immediately on off.html
        if (darkOverlay) {
            darkOverlay.style.opacity = "1";
        }
    }

    // Load movie info immediately
    updateMovie(subgenre);

    // Click handler for lightswitch
    lightSwitch.addEventListener("click", () => {
        if (darkOverlay) {
            // Fade overlay depending on destination
            darkOverlay.style.opacity = nextPage === "off.html" ? "1" : "0";
        }

        setTimeout(() => {
            window.location.href = nextPage;
        }, 400);
    });
});

// Update list of announced movies so far
async function loadAnnouncedMovies() {
    try {
        const response = await fetch("assets/horror_advent_calendar_full.json");
        const calendar = await response.json();

        const now = new Date();
        const options = { month: "short", day: "numeric" };
        const today = now.toLocaleDateString("en-US", options);

        // Convert today's date into a comparable form
        const announcedMovies = calendar.filter(entry => {
            const entryDate = new Date(`${entry.date}, 2025`); // assumes year 2025
            return entryDate <= now;
        });

        const listEl = document.getElementById("movieList");
        if (!listEl) return;

        announcedMovies.forEach(entry => {
            const li = document.createElement("li");
            li.classList.add("movie-entry");

            const scary = entry.scary ? entry.scary.title : null;
            const fun = entry.fun ? entry.fun.title : null;

            li.innerHTML = `
                <strong>${entry.date}</strong> ~ 
                ${fun ? `${fun}` : ""}
                ${scary && fun ? " / " : ""}
                ${scary ? `${scary}` : ""}
            `;
            listEl.appendChild(li);
        });

    } catch (err) {
        console.error("Error loading movie list:", err);
    }
}

// Run it if #movieList exists (on the page that shows the list)
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("movieList")) {
        loadAnnouncedMovies();
    }
});
