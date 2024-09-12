'use strict';
const { getAuthToken } = require('../auth');

async function transactionRoutes(fastify, options) {
  fastify.post('/create-transaction', async (request, reply) => {
    const maxRetries = 3;
    const retryDelay = 2000;
    const authToken = await getAuthToken();

    const requestData = {
      amount: 1000,
      currency: "USD",
      lang: "en",
      hookUrl: `${process.env.BASE_URL}/webhook`,
      callback: `${process.env.BASE_URL}/callback`,
      callbackFail: `${process.env.BASE_URL}/callbackFail`,
      billing: {
        firstName: "John",
        lastName: "Doe",
        address1: "123 Street",
        city: "Cityville",
        state: "State",
        country: "US",
        postalCode: "12345",
        phone: "1234567890",
        email: "john.doe@example.com",
        externalUserId: "user123",
        dateOfBirth: "1980-01-01"
      },
      orderId: "order123",
      cardToken: "token123",
      payment3dsType: "Redirection",
      kycVerified: true,
      previousPaymentCount: 5,
      cardData: {
        cardNumber: "4111111111111111",
        cardHolderName: "John Doe",
        cardExpiryDate: "12",
        cardExpiryDate2: "2024",
        cardCvv: "123",
        browser: {
          colorDepth: 24,
          userAgent: "Mozilla/5.0",
          language: "en-US",
          timeZone: "-300",
          screenWidth: 1920,
          javaEnabled: true,
          customerIp: "192.168.1.1",
          screenHeight: 1080,
          windowHeight: 800,
          timeZoneOffset: -300,
          windowWidth: 1200
        }
      },
      saveCard: true,
      merchantInformation: {
        name: "Example Merchant",
        merchantName: "Example Merchant 3DS",
        country: "US",
        address1: "123 Example St.",
        administrativeArea: "CA",
        locality: "Example City",
        postalCode: "12345",
        url: "https://example.com",
        customerServicePhoneNumber: "123-456-7890",
        categoryCode: "5533",
        noteToBuyer: "Thank you for your purchase!"
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(requestData),
    };

    async function fetchWithRetry(url, options, retries, delay) {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch(url, options);

          if (response.ok) {
            return response;
          } else {
            throw new Error(`API Error: ${response.status} - ${await response.text()}`);
          }
        } catch (error) {
          if (attempt < retries) {
            fastify.log.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            throw error;
          }
        }
      }
    }

    try {
      const response = await fetchWithRetry('https://api.omno.com/transaction/h2h/create', options, maxRetries, retryDelay);

      const waitForWebhook = new Promise((resolve, reject) => {
        const interval = 1000;
        const timeout = 30000;

        let elapsedTime = 0;

        const checkWebhook = setInterval(() => {
          if (fastify.sharedData.threeDSRedirectUrl) {
            clearInterval(checkWebhook);
            resolve(fastify.sharedData.threeDSRedirectUrl);
          }

          elapsedTime += interval;
          if (elapsedTime >= timeout) {
            clearInterval(checkWebhook);
            reject(new Error('Timed out waiting for 3DS Redirect URL'));
          }
        }, interval);
      });

      const threeDSRedirectUrl = await waitForWebhook;
      reply.send({ status: 'Transaction created', threeDSRedirectUrl });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Transaction failed', details: error.message });
    }
  });
}

module.exports = transactionRoutes;
