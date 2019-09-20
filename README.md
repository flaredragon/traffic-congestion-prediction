# Traffic Prediction
Proposed Proof of Concept to solve Traffic Congestion and Prediction Problem for Smart Cities.
Used - 
LSTM(for future prediction) + CNN(To detect traffic density) + Real Time Tweets 
Combined all three to produce a traffic congestion factor(TCF) and suggest routes based on that using Google API at any time in future.

## Contents - 

#### Public Folder - 
TCF Data till 18th September

LSTM Predicted Time till 18th September

#### src Folder -  React Application

#### Utility Files -

tweets_realtime.py - To scrape geolocation tagged tweets about traffic

tempserver - Temporary server to queue all tweets recieved from scraping and act as an API for the React Application.

## Screenshots 

![Dense Traffic](https://user-images.githubusercontent.com/29121452/65313061-5d265b80-dbb1-11e9-91b1-b6423063c04f.png)
![Light Traffic](https://user-images.githubusercontent.com/29121452/65313064-5d265b80-dbb1-11e9-9fe7-71314d968c1d.png)
![Twitter Based Events](https://user-images.githubusercontent.com/29121452/65313065-5dbef200-dbb1-11e9-8d56-614195edf870.png)


##### Note: Code Cleanup is still in progress, this project was made for a hackathon
