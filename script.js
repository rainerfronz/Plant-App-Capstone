"user strict";
const apiKey = 'c7797456d4msha381fd5005f894ap1abbb1jsn3351de941775';
const searchSite = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup";
const search = "https://imdb8.p.rapidapi.com/title/auto-complete";
//function to set paramaters

function formatQuery(params) {
    //create an array of the keys in the "params" object
    const queryItems = Object.keys(params)

        .map(key => `${key}=${params[key]}`)

    return queryItems.join('&');
    console.log(queryItems);
}
//function to fetch info

function getInfo(query) {
    const params = {
        term: query,

    };
    const queryStr = formatQuery(params);
    const url = searchSite + '?' + queryStr;

    console.log(url);

    const options = {
        headers: new Headers({
            "x-rapidapi-key": apiKey
        })
    };
    fetch(url, options)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson));
}

// function getActorInfo(query) {
//     const params = {
//       q: query,
//       pageSize: maxResults,
//     };
//     const queryStr = formatParamaters(params)
//     const url2 = search + '?' + queryStr;
//     console.log(url);
//     const options = {
//       headers: new Headers({
//         "x-rapidapi-key": apiKey2
//       })
//     }

//     fetch(url2, options)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error(response.statusText);
//       })
//       .then(responseJson => console.log(responseJson))
//       .catch(err => {
//         $('#error-message').text(`Whoops: ${err.message}`);
//       });
//   }


function displayResults(responseJson) {
    console.log(responseJson);
    const showName = responseJson.results[0].name;
    const locations = responseJson.results[0].locations;
    $('.results-listing').empty();
    $('#error').empty();
    for (let i = 0; i < responseJson.results.length; i++) {

        // show name
        console.log(showName);

        // streaming services:
        for (let i = 0; i < locations.length; i++) {
            console.log(locations[i].display_name);
            console.log(locations[i].url);
        }
        $('.results-listing').append(
            `<p>${responseJson.results[i].name}</p>
                        <p>${locations[i].display_name}</p>
                    <li><h3><a href=${locations[i].url}>LINK</a></h3>
                   
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


//function to display

// function display() {

// }


$(watchForm);