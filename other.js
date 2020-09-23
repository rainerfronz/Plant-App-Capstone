console.log(responseJson.results[0]); console.log(responseJson.results[0].locations)




const showName = responseJson.results[0].name;
const locations = responseJson.results[0].locations

// show name
console.log(showName);

// streaming services:
for (let i = 0; i < locations.length; i++) {
   console.log(locations[i].display_name);
   console.log(locations[i].url);
}

