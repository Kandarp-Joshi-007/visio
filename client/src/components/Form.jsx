  // StyledForm.jsx

  import React, { useState } from 'react';
  import image from "./back.png"
  import eda from "../assets/eda report.jpg"
  import classify from "../assets/image classification.jpg"
  import filter from "../assets/image filtering.jpg"
  import feature from "../assets/image feature extraction.jpg"
  import convert from "../assets/image color space sonversion.jpg"
  import segment from "../assets/image segmentation.jpg"
  import spect from "../assets/audio spectroram.jpg"
  import wave from "../assets/audio waveform.jpg"
  import keyword from "../assets/keyword extraction.jpg"
  import analysis from "../assets/text sentiment analysis.jpg"
  import summarize from "../assets/text summarization.jpg"

  const StyledForm = () => {
      const operations = [
          { type: 'text', title: 'Text Summarization', description: 'Generate concise summaries of longer text documents.', imageUrl:summarize },
          { type: 'text', title: 'Text Sentimental Analysis', description: 'Analyse and provides the emotion express in the text.', imageUrl:analysis },
          { type: 'text', title: 'Keyword Extraction', description: ' Identify and extract the most relevant words from the text.', imageUrl:keyword },
          { type: 'image', title: 'Image Classification', description: 'Categorize images into predefined categories (e.g., animal species, clothing types).',imageUrl: classify },
          { type: 'image', title: 'Image Color Space Conversion', description: 'Find visually similar images within a dataset.', imageUrl: convert},
          { type: 'image', title: 'Image Filtering', description: 'Apply filters to enhance or modify images.', imageUrl:filter },
          { type: 'image', title: 'Image Feature Extraction', description: 'Extract the features like edge detection, corner detection, etc.', imageUrl:feature},
          { type: 'image', title: 'Image Segmentation', description: 'Partition images into meaningful regions (e.g., separating foreground objects from backgrounds).', imageUrl:segment},
          { type: 'audio', title: 'Audio Waveform', description: 'Assign audio clips to predefined categories (e.g., music genres, environmental sounds).', imageUrl:wave},
          { type: 'audio', title: 'Audio Spectogram', description: 'Detect unusual or abnormal sounds in audio recordings.', imageUrl:spect },
          { type: 'tabular', title: 'Generate an EDA Report', description: 'EDA entails exploring and visualizing data to reveal patterns, anomalies, and relationships, facilitating deeper analysis.', imageUrl: eda }
        ];

    const [fileType, setFileType] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [updatedFileData, setUpdatedFileData] = useState(null); // Define state variable to store updated file data
    const [showReport, setShowReport] = useState(false); // State to control the visibility of the report

    const handleShowReport = async () => {
      try {
          const response = await fetch('/get-download-url');
          if (!response.ok) {
              throw new Error('Failed to fetch download URL.');
          }
          const data = await response.json();
          const { downloadURL } = data;
  
          // Render the report using an iframe
          const iframe = document.createElement('iframe');
          iframe.src = downloadURL;
          iframe.style.width = '100%';
          iframe.style.height = '600px';
          iframe.title = 'Pandas Profiling Report';
          document.body.appendChild(iframe);
      } catch (error) {
          console.error('Error fetching download URL:', error);
          // Handle error
      }
  };
  

    const handleOperationSelect = (operation) => {
      setSelectedOperation(operation);
      if (operation.type === 'tabular') {
        // Show parameter form only for tabular files
      } else {
        // Hide parameter form for other file types
      }
      
      console.log("Selected Operation",{
        
          fileName,
          fileType,
          filePreview,
          // selectedOperation: operation"
      });
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        setFileType(fileExtension);
    
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
          setFileName(file.name);
        };
        reader.readAsDataURL(file);
      }
    };
    // Modify handleContinueClick function
    const handleContinueClick = async () => {
      if (!fileName || !fileType || !filePreview || !selectedOperation) {
        console.error("Please select a file and operation before continuing.");
        return;
      }
    
      const formData = {
        fileName: fileName,
        fileType: fileType,
        filePreview: filePreview,
        operation: selectedOperation.title, // Send only the title of the selected operation
      };
      
      try {
        const response = await fetch('/upload-file-operation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
    
        if (!response.ok) {
          throw new Error('Failed to upload file and store operation information.');
        }
    
        // Parse response JSON to get the download URL
        const data = await response.json();
        const { downloadURL } = data;
    
        // Send the download URL to the server for further processing
        await fetch('/process-download-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ downloadURL, operation: selectedOperation.title }) // Send selected operation title
        });
    
        // Handle the download URL as needed (e.g., display it to the user)
        console.log('Download URL:', downloadURL);
      } catch (error) {
        console.error('Error uploading file and storing operation information:', error);
        // Handle errors here
      }
    };
    
    
// After receiving the download URL
const handleDownloadURL = async (downloadURL) => {
  try {
    const response = await fetch('/process-download-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ downloadURL })
    });

    if (!response.ok) {
      throw new Error('Failed to process download URL on the server.');
    }

    // Handle success response from the server
    console.log('Download URL processed successfully on the server.');
  } catch (error) {
    console.error('Error processing download URL on the server:', error);
    // Handle error
  }
};

const handleEndClick = () => {
  // Navigate to the homepage or any other desired page
  window.location.href = '/'; // Replace '/' with the URL of your homepage
};


    return (
      <>
    
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: `url(${image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
  <div style={{ background: '#f0f0f0', padding: '40px', borderRadius: '8px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', width: '500px', fontFamily: 'Arial', textAlign: 'center' }}>
    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)', color:"#333" }}>File Upload</h2>
    
    <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>Select File</label>
      <div style={{ marginTop: '8px' }}>
        <input
          type="file"
          style={{ border: '2px solid #ccc', padding: '10px', width: '100%', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          onChange={handleFileChange}
        />
      </div>
    </div>

    {fileName && (
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', color: '#555' }}>File Name: {fileName}</p>
        <p style={{ fontSize: '1.5rem', color: '#555' }}>File Type: {fileType}</p>
      </div>
    )}
    
    <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '12px 24px', borderRadius: '5px', border: 'none', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s', marginLeft:"150px" }}>Upload</button>
  </div>
</div>


        {/* Display the list of operations based on the file type */}
     {/* Display the list of operations based on the file type */}
{fileType && (
  <div>
  <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '50px', color:"black", marginLeft:"650px", marginTop:"50px" }}>Select Operation:</h1>
  {operations
    .filter((op) => {
      if (['png', 'jpg', 'jpeg'].includes(fileType)) {
        return op.type === 'image';
      } else if (['txt'].includes(fileType)) {
        return op.type === 'text';
      } else if (['csv'].includes(fileType)) {
        return op.type === 'tabular';
      } else if (['mp3', 'wav'].includes(fileType)) {
        return op.type === 'audio';
      } else if (['mp4'].includes(fileType)) {
        return op.type === 'video';
      }
    })
    .map((operation, index) => (
      
      <div
        key={index}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'inline-block', // Display cards inline
          width: 'calc(33.33% - 20px)', // Set width for each card (33.33% of the container width with some margin)
          margin: '10px', // Margin between cards
          transition: 'all 0.3s ease', // Add transition for smoother hover effect
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for depth
          textAlign: 'center', // Center text within the card
          height: '400px', // Set fixed height for the card
        }}
        onClick={() => handleOperationSelect(operation)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
          e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.2)'; // Add stronger shadow on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'; // Reset scale on hover out
          e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)'; // Reset shadow on hover out
        }}
      >
        <div style={{ height: '70%', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
          {/* Maintain aspect ratio of images */}
          <img
            src={operation.imageUrl} // Replace 'operation.imageUrl' with the URL of your image
            alt="Operation Image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ padding: '20px', height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '1.5rem', color: '#666', margin: '0', textAlign: 'center', lineHeight: '1.3' }}>
            {operation.description}
          </p>
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px', color: 'black', textAlign: 'center', lineHeight: '1.3' }}>
            {operation.title}
          </h3>
        </div>
      </div>
    ))}
</div>

        )}
        
                {/* Display the selected operation or an empty div */}
                {selectedOperation && (
  <div style={{ marginTop: '20px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '50px', color:"black", marginLeft:"650px", marginTop:"50px" }}>Selected Operation:</h1>
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px', // Limit card width for better presentation
        margin: '0 auto', // Center card horizontally
      }}
    >
      <div style={{ height: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px' }}>
        <img
          src={selectedOperation.imageUrl} // Replace 'selectedOperation.imageUrl' with the URL of your image
          alt="Selected Operation Image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px', color:"black" }}>
        {selectedOperation.title}
      </h3>
      <p style={{ fontSize: '1.5rem', color: '#666', margin: '0' }}>
        {selectedOperation.description}
      </p>
    </div>
  </div>
)}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ 
          background: '#4CAF50', 
          color: '#fff', 
          border: 'none', 
          padding: '10px 20px', 
          fontSize: '1.4rem', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          transition: 'background 0.3s ease', 
          textDecoration: 'none' 
        }} onClick={handleContinueClick}>Continue</button>
           <a
  href="http://127.0.0.1:5500/client/AI%20ChatBot/index.html" // Adjust the path here
  target="_blank" // Add this attribute to open the link in a new tab
  style={{ 
          background: 'blue', 
          marginLeft:"20px",
          width:"130px",
          color: '#fff', 
          border: 'none', 
          padding: '10px 20px', 
          fontSize: '1.4rem', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          transition: 'background 0.3s ease', 
          textDecoration: 'none' 
        }}
>
  Custom Code
</a>
          <button style={{ 
          background: '#DC143C', 
          marginLeft:"20px",
          color: '#fff', 
          border: 'none', 
          padding: '10px 20px', 
          fontSize: '1.4rem', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          transition: 'background 0.3s ease', 
          textDecoration: 'none' 
        }} onClick={handleEndClick}>End</button>
          
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                
            </div>
   



      {/* Link to redirect to a new page */}
    
            {/* Placeholder for displaying the report (optional) */}
            {showReport && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
                    {/* Here you can display the report using an iframe or any other element */}
                    {/* <iframe src={reportURL} width="100%" height="600px" title="Pandas Profiling Report"></iframe> */}
                    {/* Or render the report content directly */}
                    {/* <div dangerouslySetInnerHTML={{ __html: reportContent }}></div> */}
                    {/* Update this part according to how you want to display the report */}
                </div>
            )}
                </>
    );
  };

  export default StyledForm;
