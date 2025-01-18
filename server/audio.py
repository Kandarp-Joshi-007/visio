import sys
import firebase_admin
from firebase_admin import credentials, storage
import requests
import librosa
import matplotlib.pyplot as plt
import numpy as np
import os
import hashlib
import time

# Function to generate a unique identifier for the audio file
def generate_unique_id(audio_data):
    # Calculate MD5 hash of the audio data
    md5_hash = hashlib.md5(audio_data).hexdigest()
    # Append current timestamp to make the identifier unique
    unique_id = f"{md5_hash}_{int(time.time())}"
    return unique_id

# Get audio URL from command line argument 
audio_url = sys.argv[1]  

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

# Download audio from URL
print("Downloading audio from URL:", audio_url)
response = requests.get(audio_url)
if response.status_code != 200:
    print("Error: Unable to download audio. HTTP status code:", response.status_code)
    sys.exit(1)

# Generate a unique identifier for the audio
unique_id = generate_unique_id(response.content)

# Write audio data to a temporary file
audio_filename = f"temp_audio_{unique_id}.mp3"
with open(audio_filename, "wb") as audio_file:
    audio_file.write(response.content)

# Load audio data
y, sr = librosa.load(audio_filename, sr=None)

# Perform waveform visualization
print("Performing waveform visualization...")
plt.figure(figsize=(14, 5))
plt.plot(np.arange(len(y)) / sr, y)
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title('Waveform Visualization')
waveform_filename = f"temp_waveform_{unique_id}.png"
plt.savefig(waveform_filename, bbox_inches='tight', pad_inches=0)  # Save the plot as PNG
plt.close()  # Close the plot to free memory

# Upload waveform image to Firebase Storage
blob = bucket.blob(waveform_filename)
blob.upload_from_filename(waveform_filename)

# Get public URL of the uploaded waveform image
waveform_url = blob.public_url

# Set ACL (Access Control List) to allow public read access
blob.acl.save_predefined('publicRead')

# Print URL to console
print("Waveform URL:", waveform_url)

# Clean up temporary files
os.remove(audio_filename)
os.remove(waveform_filename)
