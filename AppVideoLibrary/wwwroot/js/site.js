// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const keyAPI = 'a3b568a8d4a540758083ef2215c4f334';
const most_popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}&language=en-US&page=1`;
const image_base = 'https://image.tmdb.org/t/p/w1280'
const search_base_url = `https://api.themoviedb.org/3/search/movie?api_key=${keyAPI}&query=`;



async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData);
}
getMovies(most_popular_url);

//drawing cards:
function showMovies(data) {
    const moviesEl = document.querySelector('.movies');

    //clean up previous movies:
    document.querySelector('.movies').innerHTML = '';

    data.results.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
    
        <div class = "movieCoverInner" >
         <img src = '${image_base}'
          class = "movieCover" 
          alt = '${movie.original_title}'>
            <div class = "movieCoverDarkened"></div> 
            </div> 
            <div class = "movieInfo">
            <div class = "movieTitle">${movie.original_title}</div> 
              <div class = "movieCategory">${movie.genre_ids.map((genre) => ` ${genre}`)}</div>
              <div class = "movieAverage movieAverage--${getClassByRate(movie.vote_average)}">${movie.vote_average}</div> 
              </div>`;

        moviesEl.appendChild(movieEl);
    });
}
//colored circles:
function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green';
    } else if (vote > 5) {
        return 'orange';
    } else {
        return 'red';
    }
}
// поиск:
const form = document.querySelector('form');
const search = document.querySelector('input');
const button = document.querySelector('button');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = '${ search_base_url }${ search.value }';
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }
});


button.addEventListener('click', (e) => {
    const apiSearchUrl = '$ {search_base_url }${ search.value }';
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }
});

const logo = document.querySelector('.headerLogo');
logo.addEventListener('click', () => {
    document.location.reload();
});

