const assert = require('assert');
assert.ok(process.env.JAMBONZ_ACCOUNT_SID, 'You must define the JAMBONZ_ACCOUNT_SID env variable');
assert.ok(process.env.JAMBONZ_API_KEY, 'You must define the JAMBONZ_API_KEY env variable');
assert.ok(process.env.JAMBONZ_REST_API_BASE_URL, 'You must define the JAMBONZ_REST_API_BASE_URL env variable');

const express = require('express');
const app = express();
const {WebhookResponse} = require('@jambonz/node-client');
const opts = Object.assign({
  timestamp: () => `, "time": "${new Date().toISOString()}"`,
  level: process.env.LOGLEVEL || 'debug'
});
const logger = require('pino')(opts);
const port = process.env.HTTP_PORT || 3000;
const routes = require('./lib/routes');

app.locals = {
  ...app.locals,
  logger,
  client: require('@jambonz/node-client')(
    process.env.JAMBONZ_ACCOUNT_SID,
    process.env.JAMBONZ_API_KEY, {
      baseUrl: process.env.JAMBONZ_REST_API_BASE_URL
  })
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.WEBHOOK_SECRET) {
  const secrets = process.env.WEBHOOK_SECRET.split(',').map((s) => s.trim());
  app.use(WebhookResponse.verifyJambonzSignature(secrets));
}

app.use('/', routes);
app.use((err, req, res, next) => {
  logger.error(err, 'burped error');
  res.status(err.status || 500).json({msg: err.message});
});

const server = app.listen(port, () => {
  logger.info(`Example jambonz app listening at http://localhost:${port}`);
});