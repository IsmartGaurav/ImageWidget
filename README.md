# Image Inpainting Widget

This project is an image inpainting widget that allows users to upload an image, draw a mask on it, and save the masked image. The backend is built using Node.js and Express, and the frontend is built using React.

## Features

- Upload an image and draw a mask on it.
- Save the original and masked images to the server.
- Display saved mask images on the main page.
- Export the mask image as a PNG file.

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express, MongoDB
- **Storage**: Local file storage

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

### Backend

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/image-inpainting-widget.git
   cd image-inpainting-widget/backend


## Install dependencies:

npm install

## Start the server:

node server.js
The server will run on http://localhost:5000.

## Usage : 

- Upload an Image: Use the upload button to select an image from your device.
- Draw a Mask: Use the brush controls to draw a mask on the uploaded image.
- Save the Image: Click the save button to save the original and masked images to the server.
- Export the Mask: Click the export button to download the mask image as a PNG file.
- View Saved Images: The saved mask images will be displayed on the main page.


## API Endpoints
 
- **Upload Images**

URL: /upload
Method: POST
Description: Uploads the original and mask images.
Request Body:
originalImage: File
maskImage: File

- Response:
201 Created: Images uploaded successfully.
500 Internal Server Error: Error uploading images.

- **Fetch Images**
URL: /images
Method: GET
Description: Fetches all saved images.

- Response:
200 OK: Array of image objects.
500 Internal Server Error: Error fetching images.

- **Fetch Specific Image**
- URL: /images/:id
- Method: GET
- Description: Fetches a specific image by ID.

- Response:
200 OK: Image object.
404 Not Found: Image not found.
500 Internal Server Error: Error fetching image.

- **Serve Image File**

URL: /images/:id/:type
Method: GET
Description: Serves an image file (original or mask) by ID.

- Response:
200 OK: Image file.
404 Not Found: Image not found.
500 Internal Server Error: Error serving image.