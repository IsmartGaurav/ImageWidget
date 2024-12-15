const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  originalImage: String,
  maskImage: String,
});

const Image = mongoose.model('Image', imageSchema);

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'originalImage' }, { name: 'maskImage' }]), async (req, res) => {
  const { originalImage, maskImage } = req.files;

  const newImage = new Image({
    originalImage: originalImage[0].path,
    maskImage: maskImage[0].path,
  });

  try {
    await newImage.save();
    res.status(201).json({ message: 'Images uploaded successfully', image: newImage });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error });
  }
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

app.get('/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error });
  }
});

app.get('/images/:id/:type', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const filePath = req.params.type === 'original' ? image.originalImage : image.maskImage;
    res.sendFile(path.resolve(filePath));
  } catch (error) {
    res.status(500).json({ message: 'Error serving image', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
