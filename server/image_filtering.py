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

# Rest of your code for image processing...
# Apply Mean filter for blurring/smoothing
mean_blurred_image = cv2.blur(image, (5, 5))

# Apply Gaussian blur for blurring/smoothing
gaussian_blurred_image = cv2.GaussianBlur(image, (5, 5), 0)

# Apply sharpening
kernel_sharpening = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
sharpened_image = cv2.filter2D(image, -1, kernel_sharpening)

# Apply edge detection
edge_detected_image = cv2.Canny(image, 100, 200)

# Apply noise reduction
denoised_image = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)

# Upload original image to Firebase Storage
blob = bucket.blob('original.jpg') 
cv2.imwrite('original.jpg', image)
blob.upload_from_filename('original.jpg')
original_img_url = blob.public_url

# Upload filtered images to Firebase Storage
blob = bucket.blob('mean_blurred_image.jpg') 
cv2.imwrite('mean_blurred_image.jpg', mean_blurred_image)
blob.upload_from_filename('mean_blurred_image.jpg')
mean_blurred_image_img_url = blob.public_url

# Set ACL (Access Control List) to allow public read access
blob.acl.save_predefined('publicRead')

blob = bucket.blob('gaussian_blurred_image.jpg') 
cv2.imwrite('gaussian_blurred_image.jpg', gaussian_blurred_image)
blob.upload_from_filename('gaussian_blurred_image.jpg')
gaussian_blurred_image_img_url = blob.public_url

# Set ACL (Access Control List) to allow public read access
blob.acl.save_predefined('publicRead')

blob = bucket.blob('sharpened_image.jpg') 
cv2.imwrite('sharpened_image.jpg', sharpened_image)
blob.upload_from_filename('sharpened_image.jpg')
sharpened_image_img_url = blob.public_url

# Set ACL (Access Control List) to allow public read access
blob.acl.save_predefined('publicRead')

blob = bucket.blob('edge_detected_image.jpg') 
cv2.imwrite('edge_detected_image.jpg', edge_detected_image)
blob.upload_from_filename('edge_detected_image.jpg')
edge_detected_image_img_url = blob.public_url

# Set ACL (Access Control List) to allow public read access
blob.acl.save_predefined('publicRead')

blob = bucket.blob('denoised_image.jpg') 
cv2.imwrite('denoised_image.jpg', denoised_image)
blob.upload_from_filename('denoised_image.jpg')
denoised_image_img_url = blob.public_url

# Set ACL (Access Control List) to allow public read access
blob.acl.save_predefined('publicRead')

# Print URLs to console
print("Image URLs:")
print("Original Image URL:", original_img_url)
print("Mean Blurred Image URL: ", mean_blurred_image_img_url)
print("Gaussian Blurred Image URL: ", gaussian_blurred_image_img_url)
print("Sharpened Image URL: ", sharpened_image_img_url)
print("Edge Detected Image URL:", edge_detected_image_img_url)
print("Denoised Image URL: ", denoised_image_img_url)
