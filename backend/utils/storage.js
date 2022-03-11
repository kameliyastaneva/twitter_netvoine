import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { FIREBASE_CONFIG, FIREBASE_DATABASE_URI } from "./secrets.js";

const app = initializeApp(FIREBASE_CONFIG);
const database = getDatabase(app, FIREBASE_DATABASE_URI);

export function writeTweets(tweets) {
  for (let tweet of tweets.tweets) {
    set(ref(database, "tweets/" + tweet.tweet.id), tweet);
  }
  set(ref(database, "next_token/"), tweets.next_token);
}

export async function readAllTweets() {
  const dbRef = ref(database);
  let tweets = [];
  await get(child(dbRef, "tweets/")).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      tweets.push(childSnapshot.val());
    });
  });
  return tweets;
}

export async function readNextToken() {
  const dbRef = ref(database);
  let next_token = "";
  await get(child(dbRef, "next_token/")).then((snapshot) => {
    next_token = snapshot.val();
  });
  return next_token;
}
