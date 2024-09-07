async function webhookRoutes(fastify, options) {
  fastify.post('/webhook', async (request, reply) => {
    const webhookData = request.body;
    console.log("webhookData:   ",webhookData);

    try {
      fastify.log.info('Webhook received:', webhookData);

      // Check for specific data such as 3DS redirection URL
      if (webhookData['3dsRedirectUrl']) {
        fastify.log.info('3DS Redirection URL:', webhookData['3dsRedirectUrl']);
        // Handle 3DS redirection URL
        // You can perform further actions, like notifying a client or redirecting.
      }

      // Log other important webhook events, if any
      if (webhookData.status) {
        fastify.log.info('Transaction status:', webhookData.status);
      }

      reply.send({ status: 'Webhook processed successfully' });
    } catch (error) {
      fastify.log.error('Error processing webhook:', error.message);

      reply.status(500).send({ error: 'Webhook processing failed', details: error.message });
    }
  });
}

module.exports = webhookRoutes;
