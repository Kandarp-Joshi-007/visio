import sys
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import firebase_admin
from firebase_admin import credentials, storage
import numpy as np
import cv2
import requests

# Get image URL from command line argument 
image_url = sys.argv[1]  

# Load the pre-trained ResNet50 model
model = keras.applications.ResNet50(weights='imagenet')

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

print("Initializing Firebase Admin SDK...")
# Specify the correct path to the service account key file
cred = credentials.Certificate(r"C:\Users\Galaxy\Desktop\Projects\visio\server\xenesis-ff41b-firebase-adminsdk-rb0f6-989c5dfcb1.json")
firebase_admin.initialize_app(cred, firebase_config)
bucket = storage.bucket()

# Download image from URL
print("Downloading image from URL:", image_url)
response = requests.get(image_url)
if response.status_code != 200:
    print("Error: Unable to download image. HTTP status code:", response.status_code)
    sys.exit(1)

# Decode image data
print("Decoding image data...")
image_data = np.frombuffer(response.content, dtype=np.uint8)
image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)

# Check if image is loaded successfully
if image is None:
    print("Error: Unable to decode image from URL.")
    sys.exit(1)

# Preprocess the input image for ResNet50 model
img = cv2.resize(image, (224, 224))
img = np.expand_dims(img, axis=0)
img = preprocess_input(img)

# Make predictions
predictions = model.predict(img)
decoded_predictions = decode_predictions(predictions, top=3)[0]

# Print the top 3 predicted classes and their probabilities
for imagenet_id, label, score in decoded_predictions:
    print(label, score)
