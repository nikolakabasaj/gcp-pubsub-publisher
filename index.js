const express = require('express');
const { initTopicsAndSubs } = require('./pubsub/initializer');
const { publishMessage } = require('./pubsub/publisher');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');

const app = express();
const port = 3000;

app.use(express.json());

initTopicsAndSubs();

const entityTypes = Object.keys(config.entities);

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "PubSub Test API", version: "1.0.0" },
    paths: {
      "/pub-sub/{entityType}": {
        post: {
          summary: "Publish a message to PubSub",
          parameters: [
            {
              in: "path",
              name: "entityType",
              schema: { type: "string", enum: entityTypes },
              required: true,
              description: "Type of entity to publish"
            }
          ],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } }
          },
          responses: {
            200: { description: "Message Published" },
            400: { description: "Invalid entity type or payload" }
          }
        }
      }
    }
  },
  apis: []
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// POST endpoint to publish message
app.post('/pub-sub/:entityType', async (req, res) => {
  try {
    await publishMessage(req.params.entityType, req.body);
    res.status(200).send('Message Published to PubSub');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`PubSub test app running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
