import Twitter from "twitter-v2";
import axios from "axios";
import { TWITTER_API_BEARER_TOKEN, GOOGLE_MAPS_API_KEY } from "./secrets.js";

export async function getLatest100Tweets(maxResults = 10, nextToken) {
  const client = new Twitter({
    bearer_token: TWITTER_API_BEARER_TOKEN,
  });

  const params = {
    query: "#netvoine OR #нетвойне",
    max_results: maxResults,
    expansions: "author_id,attachments.media_keys",
    tweet: {
      fields: [
        "created_at",
        "source",
        "author_id",
        "entities",
        "public_metrics",
        "attachments",
      ],
    },
    user: {
      fields: ["username", "location"],
    },
    media: {
      fields: ["preview_image_url", "url"],
    },
  };

  if (nextToken) {
    params["next_token"] = nextToken;
  }

  let response;
  try {
    const getRecentUrl = "tweets/search/recent"
    response = await client.get(getRecentUrl, params);
  } catch (err) {
    throw new Error(err.message);
  }

  const fullTweets = [];
  for (let tweet_obj of response.data) {
    let tweet = {
      tweet: tweet_obj,
      user: {
        ...response.includes.users.filter(
          (user) => user.id == tweet_obj["author_id"]
        )[0],
      },
    };
    try {
      let tweetMediaKeys = [...tweet_obj.attachments.media_keys];
      let media = [
        ...response.includes.media.filter((media) => {
          if (tweetMediaKeys.includes(media.media_key)) {
            return media;
          }
        }),
      ];
      tweet["media"] = media;
    } catch {}

    if (tweet.user.location) {
      let location_lat_long = await geocode(tweet.user.location);
      if (location_lat_long) {
        tweet["lat_long"] = location_lat_long;
        fullTweets.push(tweet);
      }
    }
  }

  console.log("Retrieved Tweets: " + fullTweets.length);
  return { tweets: fullTweets, next_token: response.meta.next_token };
}

async function geocode(location) {
  let lat_long;
  await axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: GOOGLE_MAPS_API_KEY,
      },
    })
    .then((response) => {
      if (response.data.status == "OK") {
        lat_long = response.data.results[0].geometry.location;
      }
    })
    .catch((err) => console.log(err));
  return lat_long || false;
}
