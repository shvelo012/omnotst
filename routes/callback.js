module.exports = async function (fastify, opts) {
  fastify.get('/callback', (request, reply) => {
    try {
      fastify.log.info('Payment successful');
      reply.view('success');
    } catch (error) {
      fastify.log.error(error);
      reply.code(503).send({ error: 'Service Unavailable' });
    }
  });
};
