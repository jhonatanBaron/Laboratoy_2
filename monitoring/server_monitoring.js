const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 7000;

let instanceStatus = {
    "instance_1": [],
    "instance_2": []
};

// Realizar un health check en cada instancia
const checkInstanceHealth = async () => {
    const instances = [
        { name: 'instance_1', url: 'http://localhost:5000' },
        { name: 'instance_2', url: 'http://localhost:5001' }
    ];

    for (const instance of instances) {
        try {
            const startTime = Date.now();
            await axios.get(instance.url);
            const responseTime = Date.now() - startTime;

            instanceStatus[instance.name].push({
                status: 'UP',
                responseTime
            });
        } catch (error) {
            instanceStatus[instance.name].push({
                status: 'DOWN',
                responseTime: null
            });
        }

        if (instanceStatus[instance.name].length > 10) {
            instanceStatus[instance.name].shift(); // Mantener un historial de 10 entradas
        }
    }
};

// Ejecutar el health check cada 10 segundos
setInterval(checkInstanceHealth, 10000);

// Endpoint para obtener el estado de los servidores
app.get('/status', (req, res) => {
    res.json(instanceStatus);
});

app.listen(PORT, () => {
    console.log(`Monitoring server listening on port ${PORT}`);
});
