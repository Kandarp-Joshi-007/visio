const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const excelToJson = require('convert-excel-to-json');

// Firebase setup
const { initializeApp } = require("firebase/app");
const firebaseConfig = {
  apiKey: "AIzaSyAPmI2GrAGRim5IRKJbnbzkh_vkss8d2tk",
  authDomain: "xenesis-ff41b.firebaseapp.com",
  projectId: "xenesis-ff41b",
  storageBucket: "xenesis-ff41b.appspot.com",
  messagingSenderId: "817731298821",
  appId: "1:817731298821:web:bde1873ed1e25a093e5e6c",
  measurementId: "G-2NC81SKZDN",
  databaseURL:"https://xenesis-ff41b-default-rtdb.firebaseio.com",
};
const firebaseApp = initializeApp(firebaseConfig);
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const storage = getStorage(firebaseApp);

router.post('/upload-file-operation', async (req, res) => {
  try {
    console.log('Starting file upload process...');
    
    // Extract file information from the request body
    const { fileName, fileType, filePreview, operation } = req.body;

    // Log the received file information
    console.log('Received file information:');
    console.log('File Name:', fileName);
    console.log('File Type:', fileType);
    // Optionally log the file preview (for debugging purposes)
    // console.log('File Preview:', filePreview);
    console.log('Operation:', operation);

    // Ensure that the required fields are present
    if (!fileName || !fileType || !filePreview || !operation) {
      console.error('Missing file information:', req.body);
      return res.status(400).json({ error: 'Missing file information.' });
    }

    // Convert base64 string to buffer
    console.log('Converting base64 string to buffer...');
    const fileData = Buffer.from(filePreview.split(';base64,').pop(), 'base64');

    // Upload file to Firebase Storage
    console.log('Uploading file to Firebase Storage...');
    const storageRef = ref(storage, `uploads/${fileName}`);
    await uploadBytes(storageRef, fileData);

    // Get download URL
    console.log('Retrieving download URL...');
    const downloadURL = await getDownloadURL(storageRef);

    // Send download URL back to the frontend
    console.log('Sending download URL to frontend...');
    res.status(200).json({ downloadURL });
    
    console.log('File upload process completed successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file.' });
  }
});


// In your server file (e.g., app.js or routes file)
router.post('/process-download-url', async (req, res) => {
  try {
    const { downloadURL, operation } = req.body;

    // Check the operation type
    if (operation === 'Image Segmentation') {
      // Run the image segmentation Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['image_segmentation.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Image segmentation completed successfully.');
          res.status(200).json({ message: 'Image segmentation completed successfully.' });
        } else {
          console.error(`Image segmentation failed with code ${code}`);
          res.status(500).json({ error: 'Image segmentation failed.' });
        }
      });
    } else if (operation === 'Image Feature Extraction') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['image_feature_extraction.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Image Feature Extraction completed successfully.');
          res.status(200).json({ message: 'Image Feature Extraction completed successfully.' });
        } else {
          console.error(`Image Feature Extraction failed with code ${code}`);
          res.status(500).json({ error: 'Image Feature Extraction failed.' });
        }
      });
    } else if (operation === 'Image Filtering') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['image_filtering.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Image Filtering completed successfully.');
          res.status(200).json({ message: 'Image Filtering completed successfully.' });
        } else {
          console.error(`Image Filtering failed with code ${code}`);
          res.status(500).json({ error: 'Image Filtering failed.' });
        }
      });
    } else if (operation === 'Image Color Space Conversion') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['image_color_space_conversion.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Image Color Space Conversion completed successfully.');
          res.status(200).json({ message: 'Image Color Space Conversion completed successfully.' });
        } else {
          console.error(`Image Color Space Conversion failed with code ${code}`);
          res.status(500).json({ error: 'Image Color Space Conversion failed.' });
        }
      });
    } else if (operation === 'Image Classification') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['image_classification.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Image Classification completed successfully.');
          res.status(200).json({ message: 'Image Classification completed successfully.' });
        } else {
          console.error(`Image Classification failed with code ${code}`);
          res.status(500).json({ error: 'Image Classification failed.' });
        }
      });
    } else if (operation === 'Audio Waveform') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['audio.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Audio completed successfully.');
          res.status(200).json({ message: 'Audio completed successfully.' });
        } else {
          console.error(`Audio failed with code ${code}`);
          res.status(500).json({ error: 'Audio failed.' });
        }
      });
    } else if (operation === 'Audio Spectogram') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['audiosegmentation.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Audio Segmentation completed successfully.');
          res.status(200).json({ message: 'Audio Segmentation completed successfully.' });
        } else {
          console.error(`Audio Segmentation failed with code ${code}`);
          res.status(500).json({ error: 'Audio Segmentation failed.' });
        }
      });
    } else if (operation === 'Text to Speech') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['Texttospeech.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Audio Segmentation completed successfully.');
          res.status(200).json({ message: 'Audio Segmentation completed successfully.' });
        } else {
          console.error(`Audio Segmentation failed with code ${code}`);
          res.status(500).json({ error: 'Audio Segmentation failed.' });
        }
      });
    }else if (operation === 'Speech to Text') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['Speechtotext.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Audio Segmentation completed successfully.');
          res.status(200).json({ message: 'Audio Segmentation completed successfully.' });
        } else {
          console.error(`Audio Segmentation failed with code ${code}`);
          res.status(500).json({ error: 'Audio Segmentation failed.' });
        }
      });
    }else if (operation === 'Video') {
      // Run the image filtering Python script using the download URL as an argument
      const pythonProcess = spawn('python', ['video.py', downloadURL]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Audio Segmentation completed successfully.');
          res.status(200).json({ message: 'Audio Segmentation completed successfully.' });
        } else {
          console.error(`Audio Segmentation failed with code ${code}`);
          res.status(500).json({ error: 'Audio Segmentation failed.' });
        }
      });
    }else if (operation === 'Generate an EDA Report') {
      // Run the descriptive.py script using the download URL as an argument
      const pythonProcess = spawn('python', ['descriptive.py', downloadURL, 'output.csv', 'column_stats.csv']);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Python script executed successfully.');
          res.status(200).json({ message: 'Python script executed successfully.' });
        } else {
          console.error(`Python script exited with code ${code}`);
          res.status(500).json({ error: 'An error occurred while executing the Python script.' });
        }
      });
    } else if (operation === 'Text Summarization') {
      // Run the descriptive.py script using the download URL as an argument
      const pythonProcess = spawn('python', ['TextSummarization.py', downloadURL, 'output.csv', 'column_stats.csv']);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Python script executed successfully.');
          res.status(200).json({ message: 'Python script executed successfully.' });
        } else {
          console.error(`Python script exited with code ${code}`);
          res.status(500).json({ error: 'An error occurred while executing the Python script.' });
        }
      });
    } else if (operation === 'Keyword Extraction') {
      // Run the descriptive.py script using the download URL as an argument
      const pythonProcess = spawn('python', ['KeywordExtraction.py', downloadURL, 'output.csv', 'column_stats.csv']);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Python script executed successfully.');
          res.status(200).json({ message: 'Python script executed successfully.' });
        } else {
          console.error(`Python script exited with code ${code}`);
          res.status(500).json({ error: 'An error occurred while executing the Python script.' });
        }
      });
    } else if (operation === 'Text Sentimental Analysis') {
      // Run the descriptive.py script using the download URL as an argument
      const pythonProcess = spawn('python', ['TextSentimental.py', downloadURL, 'output.csv', 'column_stats.csv']);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Python script executed successfully.');
          res.status(200).json({ message: 'Python script executed successfully.' });
        } else {
          console.error(`Python script exited with code ${code}`);
          res.status(500).json({ error: 'An error occurred while executing the Python script.' });
        }
      });
    } else {
      // Handle other operations here if needed
      res.status(200).json({ message: 'Operation completed successfully.' });
    }
  } catch (error) {
    console.error('Error processing download URL:', error);
    res.status(500).json({ error: 'An error occurred while processing the download URL.' });
  }
});




module.exports = router;