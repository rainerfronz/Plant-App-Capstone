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
    console.log(showId);
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
            // console.log(responseJson);
            // console.log('id find')
            // console.log(responseJson.d[0].id);
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
            
            console.log(responseData.genres[0]); // need loop in display for genres
            console.log(responseData.plotSummary.text);
            console.log(responseData.ratings.rating);
            console.log(responseData.title.image.url);

        })
        .catch(err => {
            $('#error').text(`Try Again: ${err.message}`);
        })
        
    ;
}



function displayResults(responseJson) {
    console.log(responseJson);
    // const showName = responseJson.results[0].name;
    //  const locations = responseJson.results[0].locations;
    $('.results-listing').empty();
    $('#error').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        // console.log(i);
        let result = responseJson.results[i];
        // show name
        // console.log(result);

        // streaming services:
        for (let j = 0; j < result.locations.length; j++) {
            // console.log(j);
            // console.log(result.locations[i].display_name);
            // console.log(result.locations[i].url);
            //show info
            
            $('.results-listing').append(
                `<li>${responseJson.results[i].name}</li>
            <li>${result.locations[j].display_name}</li>
            <li><a href=${result.locations[j].url}>Service Link</a>
                </li>`);
        }
    }
    $('#results').removeClass('hidden');

}

function displayInfo(responseData){
    console.log(responseData);
    $('#info-listing').empty();
    $('#error').empty();
    for ( let k = 0; k < responseData.genres.length; k++){
        console.log(responseData.genres[k]);  
    $('#info').append(
        `<li>${responseData.genres[k]}</li>`);
        
    }
    $('#summary').append(`<p>${responseData.plotSummary.text}`);
    $('#rating').append(`<p>${responseData.ratings.rating}`);
    $('#info').removeClass('hidden');
}

    
function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        const query = $("#search-term").val();
        handleQuery(query);
    });
}
$(watchForm);