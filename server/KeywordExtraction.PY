import nltk
from textblob import TextBlob
import json
import sys
import firebase_admin
from firebase_admin import credentials, storage
import requests

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

# Download NLTK resources
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

# Get input URL from command line argument 
input_url = sys.argv[1]

# Fetch content from the URL
response = requests.get(input_url)
if response.status_code != 200:
    print("Error: Unable to fetch content from the URL. HTTP status code:", response.status_code)
    sys.exit(1)

input_text = response.text

# Perform Named Entity Recognition (NER) using NLTK
def nltk_ner(text):
    sentences = nltk.sent_tokenize(text)
    tokenized_sentences = [nltk.word_tokenize(sentence) for sentence in sentences]
    tagged_sentences = [nltk.pos_tag(sentence) for sentence in tokenized_sentences]
    chunked_sentences = nltk.ne_chunk_sents(tagged_sentences, binary=True)

    ner_output = []
    for tree in chunked_sentences:
        for chunk in tree:
            if hasattr(chunk, 'label') and chunk.label() == 'NE':
                entity = ' '.join(c[0] for c in chunk)
                ner_output.append((entity, chunk.label()))

    return ner_output

# Perform Keyword Extraction using TextBlob
def textblob_keyword_extraction(text):
    blob = TextBlob(text)
    keywords = blob.noun_phrases
    return keywords

# Perform NER and Keyword Extraction
ner_results = nltk_ner(input_text)
keyword_results = textblob_keyword_extraction(input_text)

# Store the results in a dictionary
output_data = {
    "Keywords": list(keyword_results)
}

# Convert the output data to JSON format
output_json = json.dumps(output_data, ensure_ascii=False, indent=4).encode('utf-8')

# Upload the output JSON file to Firebase Storage and set public read access
output_blob = bucket.blob("ner_keyword_output.json")
output_blob.upload_from_string(output_json, content_type='application/json')
output_blob.acl.save_predefined('publicRead')  # Set ACL to allow public read access

# Get the public URL of the uploaded JSON file
output_url = output_blob.public_url

# Print the URL to the console
print("Named Entity Recognition and Keyword Extraction results have been stored in:", output_url)
