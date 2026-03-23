let watchlistContainer = document.getElementById("watchlist-container")
let savedMovie = JSON.parse(localStorage.getItem("watchlist")) || []


renderWatchlist()


async function renderWatchlist() {
    if (savedMovie.length === 0) {
    watchlistContainer.innerHTML = `
    <div class="empty-watchlist">
    <p class="errorMessage">Your watchlist is looking little empty...</p>
        <a href="index.html" class="watchlist-link">
            <img src="image/icon.png" class="plus-icon"/>Let's add some movies
        </a>
    
    </div>
    `
    return
}else{
        let watchlistMoviesHTML = ""
        for (let id of savedMovie) {
            const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=6a034881`)
            const moviesData = await response.json()
            console.log(moviesData)
            let moviesHTML = `
            <div class="movie-card">
                        <img src="${moviesData.Poster}" class="movie-poster" />
                        <div class="movie-info">
                            <div class="movie-header">
                                <h3>${moviesData.Title}</h3>
                                <span class="rating">⭐️ ${moviesData.imdbRating}</span>
                            </div>
                            <div class="movie-metadata">
                                <span>${moviesData.Runtime}</span>
                                <span>${moviesData.Genre}</span>
                                <button class="remove-watchlist-btn" onClick="removeFromWatchlist('${moviesData.imdbID}')">
                                <img src="image/icon1.png" class="plus-icon" />
                                Remove
                                </button>
                            </div>
                                <p class="moive-plot">${moviesData.Plot}</p>
                        </div>
                    </div>
                    <hr>
            `
            watchlistMoviesHTML += moviesHTML
        }
        watchlistContainer.innerHTML = watchlistMoviesHTML
    }
}
window.removeFromWatchlist = function (id) {
    savedMovie = savedMovie.filter(movieId => movieId !== id)
    localStorage.setItem("watchlist", JSON.stringify(savedMovie))
    console.log(id)
    renderWatchlist()
}   