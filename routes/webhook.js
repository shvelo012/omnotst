'use strict';

async function webhookRoutes(fastify, options) {
  fastify.post('/webhook', async (request, reply) => {
    const webhookData = request.body;
    console.log('webhookData:', webhookData);

    try {
      const { '3dsRedirectUrl': threeDSRedirectUrl } = webhookData;

      if (threeDSRedirectUrl) {
        fastify.sharedData.threeDSRedirectUrl = threeDSRedirectUrl;
        console.log('Stored 3DS Redirect URL:', threeDSRedirectUrl);
      }

      reply.send({ status: 'Webhook processed successfully' });
    } catch (error) {
      reply.status(500).send({ error: 'Webhook processing failed', details: error.message });
    }
  });
}

module.exports = webhookRoutes;
