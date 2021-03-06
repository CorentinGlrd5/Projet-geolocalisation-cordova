var id = 0;
localStorage.clear();

function getLocation() {
    var x = document.getElementById("affichage");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "La géolocalisation n'est pas prise en charge par ce navigateur.";
    }
}

function showPosition(position) {
    var x = document.getElementById("affichageLatitude");
    var y = document.getElementById("affichageLongitude");
    x.innerHTML = position.coords.latitude;
    y.innerHTML = position.coords.longitude;

    mymap.setView([position.coords.latitude, position.coords.longitude], 16)

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
        .bindPopup("<b>Vous êtes ici !</b>").openPopup();

    var coords = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    };
    id++;
    localStorage.setItem(id, JSON.stringify(coords));

    var historique = JSON.parse(localStorage.getItem(id));
    document.getElementById("historiqueLatitude").innerHTML = historique.lat;
    document.getElementById("historiqueLongitude").innerHTML = historique.long;
}

function showError(error) {
    var x = document.getElementById("affichage");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "Vous avez refusé la demande de géolocalisation. <br>Veillez activer votre géolocalisation pour continuer."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "La localisation est indisponible."
            break;
        case error.TIMEOUT:
            x.innerHTML = "Votre demande d'emplacement a expiré."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "Une erreur inconnue est survenue."
            break;
    }
}