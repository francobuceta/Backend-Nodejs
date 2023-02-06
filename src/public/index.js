const socketClient = io();

socketClient.on('products', (objeto) => {
    console.log('Datos de productos actualizados: ', objeto);
});