const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const traceExporter = new OTLPTraceExporter();

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start()
  .then(() => console.log('OpenTelemetry initialized successfully.'))
  .catch((error) => console.log('Error initializing OpenTelemetry', error));

process.on('SIGTERM', () => {
  sdk.shutdown().then(() => process.exit(0));
});