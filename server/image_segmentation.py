import cv2
import numpy as np
import sys
import cv2
import firebase_admin
from firebase_admin import credentials, storage
import requests


# Get image URL from command line argument 
image_url = sys.argv[1]  

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
cred = credentials.Certificate(r"C:\Users\Galaxy\Desktop\Projects\visio\server\xenesis-ff41b-firebase-adminsdk-rb0f6-989c5dfcb1.json")
firebase_admin.initialize_app(cred, firebase_config)
bucket = storage.bucket()

# Rest of your code for image segmentation and processing
# Image processing steps
blurred_image = cv2.GaussianBlur(image, (15, 15), 0)

# Convert the blurred image to grayscale
gray_blurred_image = cv2.cvtColor(blurred_image, cv2.COLOR_BGR2GRAY)

# Perform Otsu's thresholding to segment the image
_, segmented_image = cv2.threshold(gray_blurred_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# Upload original image to Firebase Storage
blob = bucket.blob('original.jpg') 
cv2.imwrite('original.jpg', image)
blob.upload_from_filename('original.jpg')
original_img_url = blob.public_url

# Upload segmented image to Firebase Storage
blob = bucket.blob('segmented.jpg')
cv2.imwrite('segmented.jpg', segmented_image) 
blob.upload_from_filename('segmented.jpg')
segmented_img_url = blob.public_url


# Set ACL (Access Control List) to allow public access to the segmented image
segmented_blob.acl.save_predefined('publicRead')

# Print URLs to console
print(original_img_url)
print(segmented_img_url)

cv2.waitKey(0)
