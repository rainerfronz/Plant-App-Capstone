"user strict";
const apiKey = 'c7797456d4msha381fd5005f894ap1abbb1jsn3351de941775';
const searchSite = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup";
const search = "https://imdb8.p.rapidapi.com/title/auto-complete";
//function to set paramaters

function formatQuery(params) {
    console.log('it works');
    //create an array of the keys in the "params" object
    const queryItems = Object.keys(params)

        .map(key => `${key}=${params[key]}`)

    return queryItems.join('&');
}
//function to fetch info

function getInfo(query) {
    const params = {
        term: query,
        country: "us"

    };

    const queryStr = formatQuery(params);
    const url = searchSite + '?' + queryStr;
    const imdbUrl = search + '?' + 'q=' + query;
    console.log(params);
    console.log(url);
    console.log(queryStr);
    console.log(imdbUrl);

    const options = {
        headers: new Headers({
            "x-rapidapi-key": apiKey
        })
    };
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#error').text(`Try Again: ${err.message}`);

        })
        fetch(search, options)
        .then(data => {
            if (data.ok) {
                return  response.json()
            }
        })

}


function displayResults(responseJson, result) {
    console.log(responseJson);
    // const showName = responseJson.results[0].name;
    //  const locations = responseJson.results[0].locations;
    $('.results-listing').empty();
    $('#error').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        console.log(i);
        let result = responseJson.results[i];
        // show name
        console.log(result);

        // streaming services:
        for (var x = 0; x < result.locations.length; x++) {
            console.log(x);
            // console.log(result.locations[i].display_name);
            // console.log(result.locations[i].url);
            // for (var z = 0; z < data.length; z++)
        }
        $('.results-listing').append(
            `<p>${responseJson.results[i].name}</p>
            <p>${result.locations[x].display_name}</p>
            <li><h3><a href=${result.locations[x].url}>LINK</a></h3>
             </li>`);
    }

    $('#results').removeClass('hidden');

}
function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        const query = $("#search-term").val();
        const maxResults = $("results").val();
        getInfo(query, maxResults);
        console.log(searchSite);
        // getInfo(searchSite, query, apiKey)

    });
}

$(watchForm);