import sys
import tweepy
import json
import requests

consumer_key=""
consumer_secret=""
access_key = ""
access_secret = ""

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)
api = tweepy.API(auth)
### keywords for the public stream
keyword = "traffic"
### initialize blank list to contain tweets
tweets = []


class CustomStreamListener(tweepy.StreamListener):
    global tweets
    def on_status(self, status):
        ### info that you want to capture
        info = status.id, status.text, status.created_at, status.place, status.user, status.in_reply_to_screen_name, status.in_reply_to_status_id 
        
        if keyword in status.text.lower():
            print(status.text)
            print(status.place.bounding_box.coordinates)
            data = {}
            data['name'] = status.text
            data['location'] = status.place.bounding_box.coordinates
            json_data = json.dumps(data)
            print(json_data)
            myobj = {'somekey': 'somevalue'}
            r = requests.post(url = "http://localhost:3002/lol", data = data)
            print(r)
        
        

    def on_error(self, status_code):
        print >> sys.stderr, 'Encountered error with status code:', status_code
        return True # Don't kill the stream

    def on_timeout(self):
        # print >> sys.stderr, 'Timeout...'
        return True # Don't kill the stream

### filter for location
# locations should be a pair of longtitude and latitude pairs, with the southwest corner
# of the bounding box coming first
sapi = tweepy.streaming.Stream(auth, CustomStreamListener())    
sapi.filter(locations=[75.9252,30.3852,77.7902,31.1222])
