import { getLatest100Tweets } from "./getTweets.js";
import { writeTweets, readAllTweets, readNextToken } from "./storage.js";

export async function twitterFirebasePipeline() {
  const latestToken = await readNextToken();
  const latest100Tweets = await getLatest100Tweets(100, latestToken);
  writeTweets(latest100Tweets);
}
