let watchlistContainer = document.getElementById("watchlist-container")
let savedMovie = JSON.parse(localStorage.getItem("watchlist")) || []

if (savedMovie.length === 0) {
    watchlistContainer.innerHTML = `
    <div class="empty-watchlist">
    <p class="errorMessage">Your watchlist is looking little empty...</p>
        <a href="index.html" class="watchlist-link">
            <img src="image/icon.png" class="plus-icon"/>Let's add some movies
        </a>
    
    </div>
    `
}