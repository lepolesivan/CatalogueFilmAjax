function rechercherDesFilms(){
    fetch('https://movies-api.julienpoirier-webdev.com/search/movies/:qmovie/:page').then(function (response){
        if(response.ok){
            response.json();
        } else {
        throw new Error('La requêt à échoué: ' + response.status);
        }
    }).then( function (data){
        
    }).catch(error => {
        console.error('An error occurred:', error.message);
    });
}