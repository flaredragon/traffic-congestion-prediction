# Traffic Prediction
Proposed Proof of Concept to solve Traffic Congestion and Prediction Problem for Smart Cities.
Used - 
LSTM(for future prediction) + CNN(To detect traffic density) + Real Time Tweets 
Combined all three to produce a traffic congestion factor(TCF) and suggest routes based on that using Google API at any time in future.

## Contents - 

### Public Folder - 
TCF Data till 18th September

LSTM Predicted Time till 18th September

### src Folder -  React Application

### Utility Files -

tweets_realtime.py - To scrape geolocation tagged tweets about traffic

tempserver - Temporary server to queue all tweets recieved from scraping and act as an API for the React Application.


##### Note: Code Cleanup is still in progress, this project was made for a hackathon
