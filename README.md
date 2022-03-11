# Visualisation Report

This interactive map visualisation shows the location of people who have used the #нетвойне twitter hashtag in their tweets. It was inspired by a visualisation by the Economist, which was comparing the locations of people highlighting that there are many Russians who are also using the hashtag.

In light of the Russian Invasion of Ukraine (24/02/2022-), I made this map in an attempt to illustrate the support people in different parts of the world have for Ukrainian people. I want to showcase their images, artwork, and messages of support and make those easily available in one place. The data is taken from Twitter’s API. My visualisation uses the location on a person’s profile to locate the tweet. This is a preferred method due to the small number of individually located tweets.

My approach in making this interactive map, was to first create a map with Mapbox and use it as a basemap for my visualisation. In order to create the UI, I used the Leaflet API, created by a Ukrainian software engineer Vladimir Agafonkin. I used it for the markers and popups. Upon opening the page, a script runs requesting data about the tweets from the Twitter API. All the tweets or personal accounts which have a location are located through Google API. Then this data is stored in Firebase and gets sent to the page through the Friesbase API, where the tweets are stored. Further, I used CSS to style the title rectangle and the tweets in the popups.

The design of the page is fairly simple. The map layout shows the countries borders and names, and when it is zoomed in it then shows also the district borders. The red dots each show a person’s location. When the dot is clicked a popup appears with the tweet and it shows the text content and its media, if it has one. The popup can be closed via the ‘X’ or by clicking away on the map. I have chosen small dots to illustrate tweets in order to illustrate the spatial scatter of people using this hashtag. A constraint is that some major locations (e.g. city names) have the same coordinates, which would mean that the dots are “stacked” on top of each other. A potential mitigation of this problem would be to use an algorithmic dispersion of such locations, adding small numbers to the coordinates.

# To run

Requirements:
* docker

Copy the folder on your computer, open it in a terminal and run:
```
docker-compose up
```