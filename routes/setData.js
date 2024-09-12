'use strict';

async function setDataRoutes(fastify, opts) {
  fastify.post('/setData', async (request, reply) => {
    try {
      fastify.sharedData.user = request.body.user;
      reply.send({ status: 'Data set successfully' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to set data', details: error.message });
    }
  });
}

module.exports = setDataRoutes;
