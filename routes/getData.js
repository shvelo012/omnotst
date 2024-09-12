'use strict';

async function getDataRoutes(fastify, opts) {
  fastify.get('/getData', (request, reply) => {
    const user = fastify.sharedData.user;
    if (user) {
      reply.send({ user });
    } else {
      reply.code(404).send({ error: 'No user data found' });
    }
  });
}

module.exports = getDataRoutes;
