import sys
import firebase_admin
from firebase_admin import credentials, storage
import requests
import librosa
import matplotlib.pyplot as plt
import numpy as np
import os

def process_audio(audio_url):
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
        return

    # Write audio data to a temporary file
    with open("temp_audio.mp3", "wb") as audio_file:
        audio_file.write(response.content)

    # Load audio data
    y, sr = librosa.load("temp_audio.mp3")

    # Perform waveform visualization
    print("Performing waveform visualization...")
    plt.figure(figsize=(12, 4))
    times = librosa.times_like(y, sr=sr)
    plt.plot(times, y)
    plt.title('Waveform')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.savefig("temp_waveform.png", bbox_inches='tight', pad_inches=0)
    plt.close()

    # Perform spectrogram visualization
    print("Performing spectrogram visualization...")
    D = np.abs(librosa.stft(y))
    plt.figure(figsize=(12, 4))
    librosa.display.specshow(librosa.amplitude_to_db(D, ref=np.max), sr=sr, x_axis='time', y_axis='log')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Spectrogram')
    plt.savefig("temp_spectrogram.png", bbox_inches='tight', pad_inches=0)
    plt.close()

    # Upload waveform image to Firebase Storage
    blob_waveform = bucket.blob("waveform.png")
    blob_waveform.upload_from_filename("temp_waveform.png")
    waveform_url = blob_waveform.public_url

    # Upload spectrogram image to Firebase Storage
    blob_spectrogram = bucket.blob("spectrogram.png")
    blob_spectrogram.upload_from_filename("temp_spectrogram.png")
    spectrogram_url = blob_spectrogram.public_url

    # Set ACL (Access Control List) to allow public read access
    blob_waveform.acl.save_predefined('publicRead')
    blob_spectrogram.acl.save_predefined('publicRead')

    # Print URLs to console
    print("Spectrogram URL:", spectrogram_url)

    # Delete temporary files
    os.remove("temp_audio.mp3")
    os.remove("temp_waveform.png")
    os.remove("temp_spectrogram.png")

# Get audio URL from command line argument 
audio_url = sys.argv[1]

# Process the audio
process_audio(audio_url)
