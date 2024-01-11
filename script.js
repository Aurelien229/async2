function whereAreYou() {
    // Récupérer la valeur du code postal depuis l'input
    const zipcode = document.getElementById('zipcodeInput').value;

    // Construire l'URL de l'API Zippopotam avec le code postal
    const apiUrl = 'http://api.zippopotam.us/be/' + encodeURIComponent(zipcode);

    // Utiliser XMLHttpRequest pour faire la requête à l'API
    let client = new XMLHttpRequest();
    client.open("GET", apiUrl, true);
    client.onreadystatechange = function() {
        if (client.readyState == 4) {
            // Traitement des données de la réponse
            displayResults(client.responseText);
        }
    };
    client.send();
}

function displayResults(responseText) {
    // Convertir la réponse JSON en objet JavaScript
    let data = JSON.parse(responseText);

    // Créer une nouvelle div pour afficher les résultats
    let resultDiv = document.createElement('div');

    // Manipuler le contenu de la div en fonction des données de l'API
    if (data.places && data.places.length > 0) {
        resultDiv.innerHTML = 'Ville: ' + data.places[0]['place name'] +
                              ', État: ' + data.places[0]['state'] +
                              ', Pays: ' + data.country;
    } else {
        resultDiv.innerHTML = 'Aucun résultat trouvé pour ce code postal ';
    }

    // Ajouter la nouvelle div à la section des résultats
    document.getElementById('resultsContainer').appendChild(resultDiv);
}