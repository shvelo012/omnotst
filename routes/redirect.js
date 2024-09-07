const fastify = require('fastify')({ logger: true });

fastify.get('/redirect-3ds', (request, reply) => {
  const { redirectUrl } = request.query;
  if (redirectUrl) {
    reply.redirect(redirectUrl);
  } else {
    reply.status(400).send({ error: 'No redirect URL provided' });
  }
});
