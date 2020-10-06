"user strict";
const apiKey = 'c7797456d4msha381fd5005f894ap1abbb1jsn3351de941775';
const searchSite = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup";
const search = "https://imdb8.p.rapidapi.com/title/auto-complete";

//function to set paramaters
function formatQuery(params) {
    // console.log('it works');
    //create an array of the keys in the "params" object
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}

//function to fetch info
async function handleQuery(query) {
    getInfo(query);
    const showId = await getShowId(query);
    const showInfo = await getTitleInfo(showId);
}

function getInfo(query) {
    const params = {
        term: query,
        country: "us"
    };

    const queryStr = formatQuery(params);
    const url = searchSite + '?' + queryStr;

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
}

//function for imbd fetch
async function getShowId(query, responseJson) {
    const param = {
        q: query,
    };

    const queryString = formatQuery(param);
    const infoURL = search + '?' + queryString;
    console.log(param);
    console.log(search);
    console.log(queryString);

    const options = {
        headers: new Headers({
            "x-rapidapi-key": apiKey
        })
    };

    const showId = await fetch(infoURL, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            return responseJson.d[0].id;

        })
        .catch(err => {
            $('#error').text(`Try Again: ${err.message}`);
        })

    // console.log(showId);
    return showId;
}

// general info api git imbd
async function getTitleInfo(showId) {
    option = {
        tconst: showId
    }
    const getOverView = "https://imdb8.p.rapidapi.com/title/get-overview-details";
    const queryStr = formatQuery(option);
    const searchForInfo = getOverView + "?" + queryStr;
    const options = {
        headers: new Headers({
            "x-rapidapi-key": apiKey
        })
    };
    const showInfo = await fetch(searchForInfo, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseData => {
            displayInfo(responseData);
            console.log(responseData);
        })
        .catch(err => {
            $('#error').text(`Try Again: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    
    $('.results-listing').empty();
    $('#error').empty();
    $('#rating').empty();
    $('#summary').empty();
    for (let i = 0; i < responseJson.results.length; i++) {

        let result = responseJson.results[i];
        // show name
         console.log(result);

        // streaming services:
        for (let j = 0; j < result.locations.length; j++) {
            // console.log(j);
            // console.log(result.locations[i].display_name);
            // console.log(result.locations[i].url);
            //show info

            $('.results-listing').append(
                `<ul><li><a href=${responseJson.results[i].external_ids.imdb.url}>${responseJson.results[i].name}</a></li>
             <li><a href=${result.locations[j].url}>${result.locations[j].display_name}</a>
                </li></ul>`);
                $('a[href^="http://"]' ).attr( 'target','_blank' );
                
        }
        
    }
    
    $('#results').removeClass('hidden');
    $('div').removeClass('hidden');

}

function displayInfo(responseData) {
    console.log(responseData);
    $('#info-listing').empty();
    $('#error').empty();
    for (let k = 0; k < responseData.genres.length; k++) {
        console.log(responseData.genres[k]);
        $('#summary').append( `<ul><li>${responseData.genres[k]}</li></ul>`);

    }
    
    $('#poster').append(`<img src=${responseData.title.image.url}/>`);
    $('#summary').append(`<p>Plot Summery:</p><ul><li>${responseData.plotOutline.text}</li><ul>`);
    $('#summary').append(`<p>Imdb Rating:</p><ul><li>${responseData.ratings.rating}`);
    $('#summary').removeClass('hidden');
}


function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        $('#poster').empty();
    
        const query = $("#search-term").val();
        handleQuery(query);
    });
}
$(watchForm);