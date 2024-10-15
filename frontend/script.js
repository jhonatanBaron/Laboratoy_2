// Función para crear una nueva instancia
async function createInstance() {
    try {
        const response = await fetch('http://localhost:6000/create-instance', {
            method: 'POST',
        });
        if (response.ok) {
            alert('Nueva instancia creada con éxito');
        } else {
            alert('Error al crear la instancia');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
}

// Función para disparar el caos
async function triggerChaos() {
    try {
        const response = await fetch('http://localhost:8000/chaos', {
            method: 'POST',
        });
        if (response.ok) {
            alert('Caos desencadenado en una instancia');
        } else {
            alert('Error al disparar el caos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
}

// Función para obtener el estado de los servidores
async function fetchStatus() {
    try {
        const response = await fetch('http://localhost:7000/status');
        const statusData = await response.json();
        
        const statusList = document.getElementById('statusList');
        statusList.innerHTML = ''; // Limpiar lista anterior

        // Renderizar estado de los servidores
        for (const [server, history] of Object.entries(statusData)) {
            const latestStatus = history[history.length - 1];
            const statusItem = document.createElement('li');
            statusItem.textContent = `${server}: ${latestStatus.status} (Response Time: ${latestStatus.responseTime})`;
            statusList.appendChild(statusItem);
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
    }
}

// Eventos de botones
document.getElementById('createInstanceBtn').addEventListener('click', createInstance);
document.getElementById('triggerChaosBtn').addEventListener('click', triggerChaos);

// Llamar a fetchStatus cada 10 segundos
setInterval(fetchStatus, 10000);

// Obtener el estado al cargar la página
fetchStatus();
