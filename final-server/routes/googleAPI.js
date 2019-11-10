// load .env data into process.env
require('dotenv').config();
const APIKey = process.env.GoogleAPIKey
const request = require('then-request');

const express = require('express');
const router  = express.Router();
const searchPlaces = require('../helpers/searchPlaces')

module.exports = () => {

  router.post("/searchPlaces", (req, res) => {
    const dataForSearch = {
      query: req.body.query,
      key:APIKey
    }
    if (req.body.location) {
      const location = req.body.location
      dataForSearch.location= `${location.lat},${location.lng}`
      dataForSearch.radius= '10000'
    }
    searchPlaces(dataForSearch, res)
  })

  router.post('/imageSearch', (req, res) => {
    const imageURL = req.body.imageUrL
    console.log(imageURL)
    request(
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
      ).getBody('utf8').then(JSON.parse).done((response) => {
        res.send(response)
      });
  })




  return router;
};
