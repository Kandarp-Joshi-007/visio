import cv2
import numpy as np
import sys
import firebase_admin
from firebase_admin import credentials, storage
import requests

# Get image URL from command line argument 
image_url = sys.argv[1]  

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

# Rest of your code for image feature extraction...
# Apply edge detection
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray_image, 100, 200)

# Perform corner detection
corners = cv2.goodFeaturesToTrack(gray_image, 100, 0.01, 10)
corners = np.int0(corners)

for corner in corners:
    x, y = corner.ravel()
    cv2.circle(image, (x, y), 3, 255, -1)

# Perform blob detection
params = cv2.SimpleBlobDetector_Params()
detector = cv2.SimpleBlobDetector_create(params)
keypoints = detector.detect(gray_image)
blobs = cv2.drawKeypoints(image, keypoints, np.array([]), (0, 0, 255),
                          cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)

# Upload processed images to Firebase Storage
def upload_image_with_acl(image_array, image_name):
    blob = bucket.blob(image_name)
    cv2.imwrite(image_name, image_array)
    blob.upload_from_filename(image_name)
    blob.make_public()
    return blob.public_url

edge_detection_img_url = upload_image_with_acl(edges, 'Edge_Detection.jpg')
corner_detection_img_url = upload_image_with_acl(image, 'Corner_Detection.jpg')
blob_detection_img_url = upload_image_with_acl(blobs, 'Blob_Detection.jpg')

# Print URLs to console
print("Image URLs:")
print("Edge Detection URL:", edge_detection_img_url)
print("Corner Detection URL:", corner_detection_img_url)
print("Blob Detection URL:", blob_detection_img_url)
