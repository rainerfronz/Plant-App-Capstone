'user strict'
const apiKey2 = "c7797456d4msha381fd5005f894ap1abbb1jsn3351de941775";
const searchURL = "https://imdb8.p.rapidapi.com/title/auto-complete";

function formatParamaters() {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encoderURIcomponent(parmams[key])}`)
  return queryItems.join('&');
}

function getActorInfo(query) {
  const params = {
    q: query,
    pageSize: maxResults,
  };
  const queryStr = formatParamaters(params)
  const url = searchURL + '?' + queryStr;
  console.log(url);
  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey2
    })
  }

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#error-message').text(`Whoops: ${err.message}`);
    });
}

function watchForm() {
  $('#name').submit(e => {
        e.preventDefault();
  const searchName = $('#name').val();
  console.log(searchName);
})
}
$(watchForm);