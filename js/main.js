import '../style.css';

// On récupère 
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const moviesList = document.querySelector('#moviesList');
const controls = document.querySelector('#controls');
const details = document.querySelector('#details');

searchForm.addEventListener('submit', (event) => {
	event.preventDefault(); // on empeche de le chargement
	const search = searchInput.value;
	searchMovies(search);
});

// API de recherche de films
const searchMovies = (query, page = 1) => {
	const url = `https://movies-api.julienpoirier-webdev.com/search/movies/${query}/${page}`;
	fetch(url)
		.then((response) => response.json()) // Convertir la réponse en format JSON
		.then((data) => {
			
			displayMovies(data.results); // Appeler une fonction pour afficher les films
			displayControls(query, data.page, data.total_pages); // Gérer l'apparition des butons de controls
			//managePagination(data.page, data.total_pages); // Gérer la pagination
		})
		.catch((error) => console.error('Erreur lors de la requête:', error)); // Gérer les erreurs
};

const displayControls = (query, page, totalPages) => {
	console.log(query, page, totalPages);
	controls.innerHTML = '';

	if (page > 1) {
		const prevButton = document.createElement('button');
		prevButton.innerText = 'Prev';
		prevButton.addEventListener('click', (e) => {
			searchMovies(query, page - 1);
		});
		controls.appendChild(prevButton);
	}

	if (page < totalPages) {
		// bouton suivant
		const nextButton = document.createElement('button');
		nextButton.innerText = 'Next';
		nextButton.addEventListener('click', (e) => {
			searchMovies(query, page + 1);
		});
		controls.appendChild(nextButton);
	}
};

// Afficher la liste des films
const displayMovies = (movies) => {
	moviesList.innerHTML = '';

	movies.forEach((movie) => {
		const movieItem = document.createElement('div');
		movieItem.classList.add('movie');
		const poster = movie.poster_path
			? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
			: 'https://via.placeholder.com/100x150?text=No+Image';

		movieItem.innerHTML = `
          <img src="${poster}" alt="${movie.title}">
          <div>
              <h3>${movie.title}</h3>
              <p>${movie.release_date}</p>
              </div>
      `;
    const detailButton = document.createElement('button');
    detailButton.innerText = `Description film`;

    detailButton.addEventListener('click', function(event){
        fetch(`http://movies-api.julienpoirier-webdev.com/infos/movies/${movie.id}`).then(function (response){
            if(response.ok){
                return response.json().then(function (data){
                    console.log(data);
					moviesList.innerHTML = "";
                    details.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
											<div>
												<h3>${data.title}</h3>
												<p>${data.release_date}</p>
												<p>${data.overview}</p>
												</div>`;
				});
            }else{
                throw new Error('Erreur page détails');
            }
        }).catch(function (error){
            console.log(error);
        })
    })
    movieItem.appendChild(detailButton);
		moviesList.appendChild(movieItem);
	});
};