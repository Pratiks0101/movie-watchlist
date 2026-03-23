const search = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const movieContainer = document.getElementById("movie-container")

let savedMovie
    try {
        savedMovie = JSON.parse(localStorage.getItem("watchlist")) || []
    } catch(error) {
        savedMovie = []
    }

async function movieSearch() {
    let searchInput = document.getElementById("search-input").value
    document.getElementById('placeholder').style.display = 'none'
    movieContainer.innerHTML = `
    <div class="loading-state">
        <i class="fa-solid fa-spinner fa-spin-pulse" 
        style="color: hsl(0, 0%, 100%);"></i>
        <p>Searching for Movie...</p>`
    const response = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=6a034881`)
    const data = await response.json()
        let searchResult = ""
        if (data.Search){
            for (const movie of data.Search) {
                const movieDetail = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=6a034881`)
                const movieData = await movieDetail.json()
                // console.log(movieData)

                const isAdded = savedMovie.includes(movieData.imdbID)
                const buttonText = isAdded ? "Added" : "Watchlist"
                const buttonImage = isAdded ? "image/circle-check.png" : "image/icon.png"
                const buttonFunction = isAdded ? "" : "addToWatchlist"
                const buttonClass = isAdded ? "added-btn disabled" : "watchlist-btn"
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
                                <button class=${buttonClass} onClick="${buttonFunction}(event, '${movieData.imdbID}')">
                                <img src="${buttonImage}" class="plus-icon" />
                                ${buttonText}
                                </button>
                            </div>
                                <p class="moive-plot">${movieData.Plot}</p>
                        </div>
                    </div>
                    <hr>
                ` 
                searchResult += movieHTML
            } 
            movieContainer.innerHTML = searchResult
        } else {
            movieContainer.innerHTML = `
            <p class="errorMessage">Unable to find what you are looking for. Please try valid movie name.</p>
            `
        }
    }

search.addEventListener('click', movieSearch)

searchInput.addEventListener('keypress', function(e) {
    if(e.key === "Enter") {
        e.preventDefault()
        movieSearch()
    }
})


window.addToWatchlist = function(event, id) {
    if(!savedMovie.includes(id)){
        savedMovie.push(id)
        localStorage.setItem("watchlist", JSON.stringify(savedMovie))
        // console.log(id)
    }
    const clickedBtn = event.currentTarget
    clickedBtn.innerHTML = `<img src="image/circle-check.png" class="plus-icon" />  Added`
    clickedBtn.classList.add("added-btn", "disabled")
    clickedBtn.disabled = true
    clickedBtn.onclick = null
}