// load .env data into process.env
require('dotenv').config();

const APIKey = process.env.GoogleAPIKey

const request = require('then-request');

module.exports = function imageSearch(imageURL) {
  return  request(
    'POST',
    `https://vision.googleapis.com/v1/images:annotate?key=${APIKey}`,
    {
      json: {
        "requests": [
            {
              "image": {
                "source": {
                  "imageUri": imageURL  
                } 
              },
              "features": [
                {
                  "type": "LANDMARK_DETECTION"
                }
              ]
            }
        ]
      }
    }
    ).getBody('utf8').then(JSON.parse)
}