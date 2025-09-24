const { PubSub } = require('@google-cloud/pubsub');
const config = require('../config');

const pubsub = new PubSub({
  apiEndpoint: process.env.PUBSUB_EMULATOR_HOST,
  projectId: process.env.GOOGLE_CLOUD_PROJECT
});

async function initTopicsAndSubs() {
  for (const key of Object.keys(config.entities)) {
    const { topic, subscription } = config.entities[key];

    const topicRef = pubsub.topic(topic);
    const [topicExists] = await topicRef.exists();
    if (!topicExists) {
      await pubsub.createTopic(topic);
      console.log(`Topic created: ${topic}`);
    }

    const subscriptionRef = topicRef.subscription(subscription);
    const [subExists] = await subscriptionRef.exists();
    if (!subExists) {
      await topicRef.createSubscription(subscription);
      console.log(`Subscription created: ${subscription}`);
    }
  }
}

module.exports = { initTopicsAndSubs };
