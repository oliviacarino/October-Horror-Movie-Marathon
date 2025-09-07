async function updateFunMovie(subgenre = "fun") {
    try {
        // Load the JSON file
        const response = await fetch("/assets/horror_advent_calendar_full.json");
        const calendar = await response.json();

        // Get today's date as "Oct 6" format
        // const now = new Date();
        // const options = { month: "short", day: "numeric" };
        // const today = now.toLocaleDateString("en-US", options); // e.g. "Oct 6"
        
        // TEMPORARY: manually set the date for testing & comment out the above three  const's
        const today = "Oct 1";  // change this to any date present in your JSON

        // Find the entry for today
        const todayEntry = calendar.find(entry => entry.date === today);

        if (!todayEntry) {
            console.warn("No entry for today:", today);
            return;
        }

        // Pick fun or scary
        const genreKey = subgenre.toLowerCase() === "scary" ? "scary" : "fun";
        const movieData = todayEntry[genreKey];

        if (!movieData) {
            console.warn(`No data for genre '${genreKey}' on ${today}`);
            return;
        }

        // Update DOM elements
        const titleEl = document.getElementById("movieTitle");
        const infoEl = document.getElementById("movieInfo");

        if (titleEl) titleEl.textContent = movieData.title;
        if (infoEl) infoEl.textContent = movieData.description;

    } catch (err) {
        console.error("Error loading or processing JSON:", err);
    }
}

// Example usage: pass "fun" or "scary"
updateFunMovie("fun");
