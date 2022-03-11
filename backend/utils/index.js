import { twitterFirebasePipeline } from "./twitterFirebasePipelineManager.js";
import { readAllTweets } from "./storage.js";

export async function mainTwitterDataPipeline() {
  await twitterFirebasePipeline();
  let allTweetData = await readAllTweets();
  console.log(allTweetData.length);
  return allTweetData
}
