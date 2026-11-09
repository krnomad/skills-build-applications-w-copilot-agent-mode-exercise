import express from 'express';
import './config/database';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});