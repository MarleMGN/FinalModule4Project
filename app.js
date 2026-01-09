// All data requests
// "http://www.omdbapi.com/?apikey={{apikey}}&"

// Poster requests
// "http://img.omdbapi.com/?apikey={{apikey}}&"

let allMovies = [];

const movieIds = [
    "tt0078788", // (1) Apocalypse Now
    "tt0066921", // (2) A Clockwork Orange
    "tt0070917", // (3) The Wicker Man
    "tt0073486", // (4) One Flew Over the Cuckoo's Nest
    "tt0077651", // (5) Halloween
    "tt0070047", // (6) The Exorcist
    "tt0076759", // (7) Star Wars: Episode IV - A New Hope
    "tt0068646", // (8) The Godfather
    "tt0075314", // (9) Taxi Driver
    "tt0071562", // (10) The Godfather Part II
    "tt0075148", // (11) Rocky
    "tt0072684", // (12) Barry Lyndon
    "tt0067992", // (13) Willy Wonka & the Chocolate Factory
    "tt0079470", // (14) Life of Brian
    "tt0080120", // (15) The Warriors
    "tt0071315", // (16) Chinatown
    "tt0073195", // (17) Jaws
    "tt0074285", // (18) Carrie
    "tt0070034", // (19) Enter the Dragon
    "tt0070510", // (20) Paper Moon
]

async function fetchAllMovies() {
    const promises = movieIds.map(id => fetchMovie(id));
    await Promise.all(promises);
    renderMovies();
}

async function fetchMovie(movieId) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=d5b623ef`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movieData = await response.json();

        allMovies.push(movieData);

        console.log(allMovies);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function searchMovies() {
    const searchInput = document.getElementById('searchinput').value.toLowerCase();
    const filteredMovies = allMovies.filter(movie => 
        movie.Title.toLowerCase().includes(searchInput)
    );

    displayMovies(filteredMovies);
}

function displayMovies(movies) {
    const moviesWrapper = document.querySelector('.movies');

    const moviesHTML = movies.map((movie, i) => 
    `<div class="movie">
        <div class="movie__poster--wrapper">
            <div class="movie__poster">
                <img src="${movie.Poster}" alt="${movie.Title} Poster">
            </div>
            </div>
            <div class="movie__description--wrapper">
                <h2 class="movie__title">${movie.Title}</h2>
                <p class="movie__year">${movie.Year}</p>
                <p class="movie__length">${movie.Runtime}</p>
            </div>
    </div>
    `).join('');

    moviesWrapper.innerHTML = moviesHTML;
}

function renderMovies() {
    const moviesWrapper = document.querySelector('.movies');

    const moviesHTML = allMovies.map((movie, i) => 
    `<div class="movie">
        <div class="movie__poster--wrapper">
            <div class="movie__poster">
                <img src="${movie.Poster}" alt="${movie.Title} Poster">
            </div>
            </div>
            <div class="movie__description--wrapper">
                <h2 class="movie__title">${movie.Title}</h2>
                <p class="movie__year">${movie.Year}</p>
                <p class="movie__length">${movie.Runtime}</p>
            </div>
    </div>
    `).join('');

    moviesWrapper.innerHTML = moviesHTML;
}

function filterMovies(event) {
    const filterValue = event.target.value;
    console.log(filterValue);

    if (filterValue === 'release_date') {
        allMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }
    else if (filterValue === 'alphabetical') {
        allMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    else if (filterValue === 'run_time') {
        allMovies.sort((a, b) => parseInt(a.Runtime) - parseInt(b.Runtime));
    }

    renderMovies();
}


fetchAllMovies();



