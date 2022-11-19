function ajaxAPI(url, methode, callback) {
    let promise = fetch(url, {
        method: methode,
    })
    .then((resp) => resp.json())
    .then(function(data) {
        callback(data);
    }).catch(function(error) {
        console.error(error + " " + url);
    });
}

function reponseExplore(objet) {
    let contenu;
    contenu = '<ul>';
    for ( let i = 0 ; i < Object.keys(objet).length ; i++ ) {
        if ( Object.values(objet)[i] !== null ) {
            contenu += '<li>' + Object.keys(objet)[i] + ' : ';
            if ( typeof Object.values(objet)[i] === 'object' ) {
                contenu += reponseExplore(Object.values(objet)[i]);
            } else {
                contenu += Object.values(objet)[i];
            }
            contenu += '</li>';
        }
    }
    contenu += '</ul>';
    return contenu;
}
        

var resultAPI = document.getElementById("resultAPI");
// Sur clic sur le bouton
document.getElementById("myBtn").addEventListener("click", function(e) {
    // Message d'attente
    resultAPI.innerHTML = "Calculs en cours...";

    // Récupération Region
    let search = document.getElementById("search").value;
    let categorie = document.getElementById("page").value;
    console.log(categorie);
    // Définition du endPoint
    let endPoint;
    if(categorie == "region"){
        endPoint = "https://geo.api.gouv.fr/regions?nom=" + search;
    } else if(categorie == "departement"){
        endPoint = "https://geo.api.gouv.fr/departements?nom=" + search;
    } else if(categorie == "epci"){
        endPoint = "https://geo.api.gouv.fr/epcis?nom=" + search;
    } else if(categorie == "commune"){
        endPoint = "https://geo.api.gouv.fr/communes?nom=" + search;
    } else{
        console.log("Erreur, la page n'est pas connue")
    }
    

    // Appel AJAX de l’API
    ajaxAPI(endPoint, "GET", function (reponse) {
        resultAPI.innerHTML = reponseExplore(reponse);
    });
}) ;