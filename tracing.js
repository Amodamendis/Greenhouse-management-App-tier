const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const traceExporter = new OTLPTraceExporter();

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

// THE FIX: Call start() directly without .then() or .catch()
sdk.start();
console.log('OpenTelemetry initialized successfully.');

process.on('SIGTERM', () => {
  sdk.shutdown().then(() => process.exit(0));
});