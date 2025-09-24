const { PubSub } = require('@google-cloud/pubsub');
const config = require('../config');

const pubsub = new PubSub({
  apiEndpoint: process.env.PUBSUB_EMULATOR_HOST,
  projectId: process.env.GOOGLE_CLOUD_PROJECT
});

/**
 * Publish a message to Pub/Sub
 * @param {string} entityType - Type of entity
 * @param {object} payload - JSON payload to send
 */
async function publishMessage(entityType, payload) {
  const { topic, subscription } = config.entities[entityType];

  try {
    const topicRef = pubsub.topic(topic);
    const [topicExists] = await topicRef.exists();
    if (!topicExists) {
      await pubsub.createTopic(topic);
      console.log(`Topic created: ${topic}`);
    }

    const messageId = await topicRef.publishMessage({
      data: Buffer.from(JSON.stringify(payload))
    });
    console.log(`Message published to ${topic} with id ${messageId}`);
  } catch (error) {
    console.error(`Error publishing message:`, error);
  }
}

module.exports = { publishMessage };
