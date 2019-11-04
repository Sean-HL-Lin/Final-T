// load .env data into process.env
require('dotenv').config();

const APIKey = process.env.GoogleAPIKey

const request = require('then-request');

module.exports = function searchPlaces (dataForSearch, res) {
  return request(
      'POST',
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        qs: dataForSearch
      }
      ).getBody('utf8').done((response) => {
        const placeArray = JSON.parse(response).results
        const resultPlaces = []
        for (let place of placeArray) {
          let targetPlace = {}
          targetPlace.name = place.name
          targetPlace.address = place.formatted_address
          targetPlace.lat = place.geometry.location.lat
          targetPlace.lng = place.geometry.location.lng
          targetPlace.placeId = place.place_id
          targetPlace.rating = place.rating
          resultPlaces.push(targetPlace)
        }
        if (placeArray[0] && placeArray[0].photos[0] ) {
          Promise.all(
            // filter out places to those that only has pictures
            placeArray.map(place => {
            if (place.photos) {
              return request(
                'POST',
                'https://maps.googleapis.com/maps/api/place/photo',
                {
                  qs : {
                    maxwidth: 200,
                    photoreference: place.photos[0].photo_reference,
                    key: APIKey
                  }
                }
                )
            }
          }).filter((each) => each)
          ).then((all) => {
            const pictures = all.map(each => each.url)
            for (let i = 0; i < resultPlaces.length; i ++) {
              resultPlaces[i].picture = pictures[i]
            }
            res.send(resultPlaces)
          }).catch(err => {})
        } else {
          res.send(resultPlaces)
        }

      })
}