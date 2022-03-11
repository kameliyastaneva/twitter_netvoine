import { twitterFirebasePipeline } from "./backend/utils/twitterFirebasePipelineManager.js";
import { readAllTweets } from "./backend/utils/storage.js";


import express from "express";

const app = express();
app.use(express.static('static'))

app.get("/api", async(req, res) => {
  let allTweetData = await readAllTweets();
  res.send(allTweetData);
  await twitterFirebasePipeline();
});

app.get("/", (req, res) => {
  res.sendFile("index.html", {root: "."})
})

app.listen(3000);
