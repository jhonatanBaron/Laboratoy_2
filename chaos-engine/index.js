const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 8000;

const instances = ['service_watermark_1', 'service_watermark_2'];

// Ruta para desencadenar el caos (destruir una instancia al azar)
app.post('/chaos', (req, res) => {
    const randomInstance = instances[Math.floor(Math.random() * instances.length)];

    exec(`docker stop ${randomInstance}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al detener instancia: ${error.message}`);
            return res.status(500).send('Error al desencadenar el caos.');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send(`Caos desencadenado. Instancia ${randomInstance} detenida.`);
    });
});

app.listen(PORT, () => {
    console.log(`Chaos Engine listening on port ${PORT}`);
});
