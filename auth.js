const axios = require('axios');

async function getAuthToken() {
  const options = {
    method: 'POST',
    url: 'https://sso.omno.com/realms/omno/protocol/openid-connect/token',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'ff307742-4394-43cf-87db-18585ada55a5',
      client_secret: 'b76de015-a5a0-46d1-8ce8-22555bad88d8'
    })
  };

  try {
    const response = await axios(options);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
}

module.exports = { getAuthToken };
