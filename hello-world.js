const client = require('prom-client');
const express = require('express');
const app = express();
const metricsApp = express();
// Create a Registry to register the metrics
const register = new client.Registry();

client.collectDefaultMetrics({
    app: 'node-application-monitoring-app',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
});

metricsApp.listen(9900, () => {
    console.log('Metrics listening on http://localhost:9900/metrics');
});

metricsApp.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));

app.get('/', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send("Helooooooooooooo!");
});