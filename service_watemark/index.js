const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const app = express();
const PORT = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/watermark', upload.single('image'), async (req, res) => {
    try {
        const image = await Jimp.read(req.file.buffer);
        const watermark = await Jimp.read('watermark.png'); // Cargar imagen de marca de agua

        image.composite(watermark, 10, 10, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.5
        });

        const outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        res.set('Content-Type', Jimp.MIME_JPEG);
        res.send(outputBuffer);
    } catch (error) {
        console.error('Error adding watermark:', error);
        res.status(500).send('Error processing image.');
    }
});

app.listen(PORT, () => {
    console.log(`Watermark service listening on port ${PORT}`);
});
