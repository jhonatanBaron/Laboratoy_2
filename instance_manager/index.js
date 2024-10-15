const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 6000;

// Ruta para crear una nueva instancia
app.post('/create-instance', (req, res) => {
    exec('docker-compose up -d --scale service_watermark=3', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al crear instancia: ${error.message}`);
            return res.status(500).send('Error al crear instancia.');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send('Nueva instancia creada con éxito.');
    });
});

app.listen(PORT, () => {
    console.log(`Instance Manager listening on port ${PORT}`);
});
