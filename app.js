'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastifyView = require('@fastify/view')
const handlebars = require('handlebars')
require('dotenv').config()
// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  fastify.decorate('sharedData', {});

  fastify.register(fastifyView, {
    engine: {
      handlebars: handlebars
    },
    root: path.join(__dirname, 'views'),
    viewExt: 'hbs'
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  });
}

module.exports.options = options
