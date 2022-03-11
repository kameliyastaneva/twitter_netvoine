
var map = L.map("map").setView([49.25089718919278, 28.470408805243423], 4);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/kameliyastaneva/cl09h0x5h000c14mjunzdqbma/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2FtZWxpeWFzdGFuZXZhIiwiYSI6ImNrdnF2azdqaTExczEyb2tnM2t1ZGhkaTcifQ.TTqr_tV1jkHmf0x1gJYsrQ",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(map);

function plotTweet(tweet) {
  const { lat, lng } = tweet.lat_long;

  var circle = L.circle([lat, lng], {
    color: "#DD2C00",
    fillColor: "#DD2C00",
    fillOpacity: 0.5,
    radius: 5000,
  }).addTo(map);

  const { text, source, created_at } = tweet.tweet;
  const { username, location } = tweet.user;

  const photos = [];
  if (tweet.media) {
    photos.push(
      ...tweet.media.map((mediaObj) => {
        if (mediaObj.type == "photo") {
          return mediaObj["url"];
        } else {
          return "";
        }
      })
    );
  }

  const photoEl = photos[0] ? `<img src="${photos[0]}">` : " ";

  circle.bindPopup(`  
        <p><b>@${username}</b>
        &#128205;${location}
        </p>
        <p>${text}</p>
        <p>${photoEl}</p>
        <p>${source}</p>
        <p>${created_at}</p>
        
    `);
}

function plotTweets(DATA) {
  for (let tweet of Object.values(DATA)) {
    plotTweet(tweet);
  }
}