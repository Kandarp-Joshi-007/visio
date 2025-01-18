import speech_recognition as sr
import requests
from firebase_admin import credentials, storage
import firebase_admin
from io import BytesIO
import sys
import moviepy.editor as mp  # Import moviepy.editor module

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

cred = credentials.Certificate(r"C:\Users\Galaxy\Desktop\Projects\visio\server\xenesis-ff41b-firebase-adminsdk-rb0f6-989c5dfcb1.json")
firebase_admin.initialize_app(cred, firebase_config)
bucket = storage.bucket()

def generate_captions(video_path):
    # Load the video file
    video = mp.VideoFileClip(video_path)
    
    # Extract audio from the video and save it as a temporary WAV file
    temp_audio_file = "temp_audio.wav"
    video.audio.write_audiofile(temp_audio_file)

    # Read the temporary WAV file and recognize the audio
    recognizer = sr.Recognizer()
    with sr.AudioFile(temp_audio_file) as source:
        audio_data = recognizer.record(source)

    # Convert the audio to text
    captions = recognizer.recognize_google(audio_data)
    
    # Delete the temporary audio file
    os.remove(temp_audio_file)

    return captions

def upload_text_to_firebase(text):
    # Upload text to Firebase Storage
    blob = bucket.blob("captions.txt")
    blob.upload_from_string(text)

    # Get the download URL
    download_url = blob.generate_signed_url(expiration=3600)

    return download_url

# Get video URL from user input
video_url = sys.argv[1]

# Download video file
print("Downloading video file...")
response = requests.get(video_url, stream=True)
if response.status_code != 200:
    print("Error: Unable to download video file. HTTP status code:", response.status_code)
    exit()

# Generate captions for the video's audio
print("Generating captions...")
captions = generate_captions(response.content)

# Upload captions to Firebase Storage
print("Uploading captions to Firebase Storage...")
output_url = upload_text_to_firebase(captions)

# Print the URL of the output text file containing captions
print("Captions saved to:", output_url)
