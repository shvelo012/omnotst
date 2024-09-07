const { getAuthToken } = require('../auth');

async function transactionRoutes(fastify, options) {
  fastify.post('/create-transaction', async (request, reply) => {
    try {
      const authToken = await getAuthToken();

      const requestData = {
        amount: 1000,
        currency: "USD",
        lang: "en",
        hookUrl: "https://upset-spiders-start.loca.lt/webhook",
        callback: "https://yourserver.com/callback",
        callbackFail: "https://yourserver.com/callbackFail",
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

      const response = await fetch('https://api.omno.com/transaction/h2h/create', options);

      if (!response.ok) {
        const errorText = await response.text(); // Capture error body in case of non-JSON response
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text(); // Get raw response as text

      // Only try to parse the response if it's not empty
      let data;
      if (responseText) {
        try {
          data = JSON.parse(responseText); // Parse only if the responseText is not empty
        } catch (jsonError) {
          throw new Error(`Failed to parse JSON: ${jsonError.message}`);
        }
      } else {
        throw new Error('Received empty response body');
      }

      console.log("data:  ", data);

      // Handle redirection for 3DS if provided in the response
      if (data.paymentUrl) {
        reply.redirect(data.paymentUrl);
      } else {
        reply.status(400).send({ error: 'Payment URL not provided in response' });
      }

    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Transaction failed', details: error.message });
    }
  });
}

module.exports = transactionRoutes;
