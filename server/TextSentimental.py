from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import json
import sys
import firebase_admin
from firebase_admin import credentials, storage

# Initialize Firebase Admin SDK with your Firebase configuration
firebase_config = {
    "apiKey": "AIzaSyAPmI2GrAGRim5IRKJbnbzkh_vkss8d2tk",
    "authDomain": "xenesis-ff41b.firebaseapp.com",
    "projectId": "xenesis-ff41b",
    "storageBucket": "xenesis-ff41b.appspot.com",
    "messagingSenderId": "817731298821",
    "appId": "1:817731298821:web:bde1873ed1e25a093e5e6c",
    "measurementId": "G-2NC81SKZDN",
    "databaseURL": "https://xenesis-ff41b-default-rtdb.firebaseio.com",
}

# Get text input from command line argument 
input_text = sys.argv[1]

# Initialize Firebase 
cred = credentials.Certificate(r"C:\Users\Galaxy\Desktop\Projects\visio\server\xenesis-ff41b-firebase-adminsdk-rb0f6-989c5dfcb1.json")
firebase_admin.initialize_app(cred, firebase_config)
bucket = storage.bucket()
analyzer = SentimentIntensityAnalyzer()

# Perform sentiment analysis
scores = analyzer.polarity_scores(input_text)

# Determine sentiment label
sentiment_label = 'positive' if scores['compound'] >= 0.05 else 'negative' if scores['compound'] <= -0.05 else 'neutral'

# Store sentiment analysis result
sentiment_result = {
    'text': input_text,
    'sentiment': sentiment_label,
    'scores': scores
}

# Convert result to JSON format
output_json = json.dumps(sentiment_result, ensure_ascii=False, indent=4).encode('utf-8')

# Upload the output JSON file to Firebase Storage and set public read access
output_blob = bucket.blob("sentiment_analysis_result.json")
output_blob.upload_from_string(output_json, content_type='application/json')
output_blob.acl.save_predefined('publicRead')  # Set ACL to allow public read access

# Get the public URL of the uploaded JSON file
output_url = output_blob.public_url

# Print the URL to the console
print("Sentiment analysis result has been stored in:", output_url)
