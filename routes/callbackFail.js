module.exports = async function (fastify, opts) {
  fastify.get('/callbackFail', (request, reply) => {
    try {
      fastify.log.info('Payment Fail');
      reply.view('fail');
    } catch (error) {
      fastify.log.error(error);
      reply.code(503).send({ error: 'Service Unavailable' });
    }
  });
};
