const axios = require('axios');
const { getAuthToken } = require('../auth');

async function transactionRoutes(fastify, options) {
  fastify.post('/create-transaction',
    //   {
    //   schema: {
    //     body: {
    //       type: 'object',
    //       required: ['amount', 'currency', 'billing', 'cardData', 'orderId', 'hookUrl', 'cardToken'],
    //       properties: {
    //         amount: { type: 'number' },
    //         currency: { type: 'string' },
    //         lang: { type: 'string' },
    //         hookUrl: { type: 'string' },
    //         callback: { type: 'string' },
    //         callbackFail: { type: 'string' },
    //         billing: {
    //           type: 'object',
    //           required: ['firstName', 'lastName', 'address1', 'city', 'state', 'country', 'postalCode', 'phone', 'email', 'externalUserId', 'dateOfBirth'],
    //           properties: {
    //             firstName: { type: 'string' },
    //             lastName: { type: 'string' },
    //             address1: { type: 'string' },
    //             city: { type: 'string' },
    //             state: { type: 'string' },
    //             country: { type: 'string' },
    //             postalCode: { type: 'string' },
    //             phone: { type: 'string' },
    //             email: { type: 'string' },
    //             externalUserId: { type: 'string' },
    //             dateOfBirth: { type: 'string' }
    //           }
    //         },
    //         cardData: {
    //           type: 'object',
    //           required: ['cardNumber', 'cardHolderName', 'cardExpiryDate', 'cardExpiryDate2', 'cardCvv', 'browser'],
    //           properties: {
    //             cardNumber: { type: 'string' },
    //             cardHolderName: { type: 'string' },
    //             cardExpiryDate: { type: 'string' },
    //             cardExpiryDate2: { type: 'string' },
    //             cardCvv: { type: 'string' },
    //             browser: {
    //               type: 'object',
    //               required: ['colorDepth', 'userAgent', 'language', 'timeZone', 'screenWidth', 'javaEnabled', 'customerIp', 'screenHeight', 'windowHeight', 'timeZoneOffset', 'windowWidth'],
    //               properties: {
    //                 colorDepth: { type: 'number' },
    //                 userAgent: { type: 'string' },
    //                 language: { type: 'string' },
    //                 timeZone: { type: 'string' },
    //                 screenWidth: { type: 'number' },
    //                 javaEnabled: { type: 'boolean' },
    //                 customerIp: { type: 'string' },
    //                 screenHeight: { type: 'number' },
    //                 windowHeight: { type: 'number' },
    //                 timeZoneOffset: { type: 'number' },
    //                 windowWidth: { type: 'number' }
    //               }
    //             }
    //           }
    //         },
    //         orderId: { type: 'string' },
    //         cardToken: { type: 'string' },
    //         payment3dsType: { type: 'string' },
    //         kycVerified: { type: 'boolean' },
    //         previousPaymentCount: { type: 'number' },
    //         saveCard: { type: 'boolean' },
    //         merchantInformation: {
    //           type: 'object',
    //           properties: {
    //             name: { type: 'string' },
    //             merchantName: { type: 'string' },
    //             country: { type: 'string' },
    //             address1: { type: 'string' },
    //             administrativeArea: { type: 'string' },
    //             locality: { type: 'string' },
    //             postalCode: { type: 'string' },
    //             url: { type: 'string' },
    //             customerServicePhoneNumber: { type: 'string' },
    //             categoryCode: { type: 'string' },
    //             noteToBuyer: { type: 'string' }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }, 
    async (request, reply) => {
      // const { amount, currency, lang, hookUrl, callback, callbackFail, billing, cardData, orderId, cardToken, payment3dsType = 'Redirection', kycVerified = false, previousPaymentCount = 0, saveCard = false, merchantInformation } = request.body;

      try {
        const authToken = await getAuthToken();
        
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({
            billing: {
              firstName: 'John',
              lastName: 'Doe',
              address1: '123 Street',
              city: 'Cityville',
              state: 'State',
              country: 'US',
              postalCode: '12345',
              phone: '1234567890',
              email: 'john.doe@example.com',
              externalUserId: 'user123'
            },
            amount: 1000,
            currency: 'USD',
            hookUrl: 'http://127.0.0.1:3000/webhook',
            callback: 'https://saba/callback',
            callbackFail: 'https://saba/callbackFail',
            orderId: 'order123',
            cardToken: 'token123',
            lang: 'en'
          })
        };

        fetch('https://api.omno.com/transaction/create', options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));

        
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Transaction failed', details: error.message });
      }
    });
}

module.exports = transactionRoutes;
