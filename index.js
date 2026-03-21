const search = document.getElementById("search-btn")
const movieContainer = document.getElementById("movie-container")

async function movieSearch() {
    let searchInput = document.getElementById("search-input").value
    const response = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=6a034881`)
    const data = await response.json()
        document.getElementById('placeholder').style.display = 'none'
        movieContainer.innerHTML = ""
        if (data.Search){
            for (const movie of data.Search) {
                const movieDetail = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=6a034881`)
                const movieData = await movieDetail.json()
                console.log(movieData)
                const movieHTML = `
                <img src="${movieData.Poster}"/>
                <h3>${movieData.Title}</h3>
                <p>${movieData.imbdRating}</p>
                <p>${movieData.Runtime}</p>
                <p>${movieData.Genre}</p>
                <p>${movieData.Plot}</p>
                `   
                movieContainer.innerHTML += movieHTML
            } 
        } else {
            movieContainer.innerHTML = `
            <p class=errorMessage>Unable to find what you are looking for. Please try valid movie name.</p>
            `
        }
    }

search.addEventListener('click', movieSearch)