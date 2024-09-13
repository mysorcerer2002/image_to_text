const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Function to post image as form data
const postImage = async (imagePath, endpointUrl) => {
  try {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Create form data
    const formData = new FormData();
    formData.append('encoded_image', imageBuffer, {
      filename: 'image.jpg', // Set the filename (adjust as needed)
      contentType: 'image/jpeg', // Set the content type (adjust as needed)
    });

    // Make a POST request using axios with form data
    const response = await axios.post(endpointUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Extract data using regex
    const regexPattern = /",\[\[(\[".*?"\])\],"/;
    const match = response.data.match(regexPattern);

    if (match && match[1]) {
      const extractedData = match[1];
      console.log('Extracted data:', extractedData);
    } else {
      console.log('No data matched the regex pattern.');
    }

    // console.log('Image posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting image:', error.message);
  }
};

// Example usage
const imagePath = './image.png';
const endpointUrl = 'https://lens.google.com/v3/upload';

postImage(imagePath, endpointUrl);
