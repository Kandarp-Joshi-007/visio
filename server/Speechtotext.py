import firebase_admin
from firebase_admin import credentials, storage
import speech_recognition as sr
import tempfile
import os

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

# Initialize Firebase Admin SDK
cred = credentials.Certificate(r"C:\Users\Galaxy\Desktop\Projects\visio\server\xenesis-ff41b-firebase-adminsdk-rb0f6-989c5dfcb1.json")
firebase_admin.initialize_app(cred, firebase_config)
bucket = storage.bucket()

def convert_speech_to_text(audio_filename):
    # Initialize the recognizer
    recognizer = sr.Recognizer()

    # Load the audio file
    with sr.AudioFile(audio_filename) as source:
        audio_data = recognizer.record(source)

    # Convert speech to text
    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.RequestError:
        print("Could not request results.")
    except sr.UnknownValueError:
        print("Unknown error occurred.")

def upload_text_to_firebase(text):
    # Upload text to Firebase Storage
    blob = bucket.blob("speech_to_text_result.txt")
    blob.upload_from_string(text)

    # Get the download URL
    download_url = blob.generate_signed_url(expiration=3600)

    return download_url

def process_audio(audio_url):
    # Download audio file
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_audio:
        response = requests.get(audio_url)
        temp_audio.write(response.content)
        temp_audio_path = temp_audio.name

    # Convert speech to text
    text = convert_speech_to_text(temp_audio_path)

    # Upload text to Firebase Storage
    download_url = upload_text_to_firebase(text)

    # Clean up temporary file
    os.remove(temp_audio_path)

    return download_url

if __name__ == "__main__":
    # Simulating getting audio URL from frontend
    audio_url = input("Enter the URL of the audio file: ")
    
    # Process the audio and get the download URL of the text
    text_download_url = process_audio(audio_url)

    # Send the download URL of the text file back to the frontend
    print(f"Download URL of the text file: {text_download_url}")
