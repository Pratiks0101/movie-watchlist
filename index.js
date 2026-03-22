const search = document.getElementById("search-btn")
const movieContainer = document.getElementById("movie-container")

let savedMovie
    try {
        savedMovie = JSON.parse(localStorage.getItem("watchlist")) || []
    } catch(error) {
        savedMovie = []
    }

async function movieSearch() {
    let searchInput = document.getElementById("search-input").value
    const response = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=6a034881`)
    const data = await response.json()
        document.getElementById('placeholder').style.display = 'none'
        movieContainer.innerHTML = ""
        let searchResult = ""
        if (data.Search){
            for (const movie of data.Search) {
                const movieDetail = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=6a034881`)
                const movieData = await movieDetail.json()
                console.log(movieData)
                const movieHTML = `
                    <div class="movie-card">
                        <img src="${movieData.Poster}" class="movie-poster" />
                        <div class="movie-info">
                            <div class="movie-header">
                                <h3>${movieData.Title}</h3>
                                <span class="rating">⭐️ ${movieData.imdbRating}</span>
                            </div>
                            <div class="movie-metadata">
                                <span>${movieData.Runtime}</span>
                                <span>${movieData.Genre}</span>
                                <button class="watchlist-btn" onClick="addToWatchlist('${movieData.imdbID}')">
                                <img src="image/icon.png" class="plus-icon" />
                                Watchlist
                                </button>
                            </div>
                                <p class="moive-plot">${movieData.Plot}</p>
                        </div>
                    </div>
                    <hr>
                ` 
                searchResult += movieHTML
            } 
            movieContainer.innerHTML += searchResult
        } else {
            movieContainer.innerHTML = `
            <p class="errorMessage">Unable to find what you are looking for. Please try valid movie name.</p>
            `
        }
    }

search.addEventListener('click', movieSearch)

window.addToWatchlist = function(id) {
    if(!savedMovie.includes(id)){
        savedMovie.push(id)
        localStorage.setItem("watchlist", JSON.stringify(savedMovie))
        console.log(id)
    }
}