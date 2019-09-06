const express = require('express');
const router  = express.Router();
const { Pool } = require('pg');
// config database
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = () => {

  router.post("/userdata", (req,res) => {
    console.log(req.body)
    db.query(`SELECT * 
              FROM users JOIN cities ON users.id = cities.user_id
              JOIN places ON cities.id = places.city_id
              Where users.name = $1`, [req.body.name])
              .then((response) => {
                res.send(response.rows)
              }).catch((err) => {
                console.log(err)
              })
  })

  router.post("/user", (req,res) => {
    db.query(`SELECT * FROM users WHERE name=$1 AND password=$2`,[req.body.name,req.body.password])
      .then((response) => {
        res.send(response.rows)
      }).catch((err) => {
        console.log(err)
      })
  })

  router.post('/cities', (req, res) => {
    db.query(`SELECT * 
              FROM cities WHERE user_id = $1`, [req.body.id]).then((response) => {
                res.send(response.rows)
              }).catch((err) => {
                console.log(err)
              })
  })


  router.post('/savePlace', (req, res) => {

    console.log('-----get datatttt')
    console.log(req.body)
    const place = req.body.place
    if (req.body.existCity === 'true') {
      // add place to city if city is in database 
      db.query(`Insert INTO places (lat, lng, rating, picture, placeId, city_id, name, address)
                values ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [place.lat, place.lng, place.rating, place.picture, place.placeId, req.body.city.id, place.name, place.address])
                .then(() => {
                  console.log('maybe im in')
                }).catch((err) => { console.log(err)})
    } else {
      city = req.body.city
      user = req.body.user
      // create city first and then add place to city
      db.query(`Insert Into cities (city, c_lat, c_lng, user_id, c_picture)
                values ($1, $2, $3, $4, $5)
                RETURNING *`
                ,[city.name, city.lat, city.lng, user.id, city.picture])
                .then((response) => {
                  // insert place to database with ref to created city
                  const cityId = response.rows[0].id
                  const createdCity = response.rows[0]
                  db.query(`Insert INTO places (lat, lng, rating, picture, placeId, city_id, name, address)
                  values ($1, $2, $3, $4, $5, $6, $7, $8)
                  `, [place.lat, place.lng, place.rating, place.picture, place.placeId, cityId, place.name, place.address])
                  .then(() => {
                    res.send(createdCity)
                  }).catch((err) => { console.log(err)})
                }).catch((err) => { console.log(err)})
    }
  })


  router.post('/createCity', (req, res) => {
    console.log(req.body)
    const city = req.body.city
    const user = req.body.user
    db.query(`INSERT INTO cities (city, c_lat, c_lng, user_id, c_picture)
              values ($1, $2, $3, $4, $5) RETURNING *
            `, [city.name, city.lat, city.lng, user.id, city.picture]).then((response) => {
              res.send(response.rows[0])
            }).catch((err) => {
              console.log(err)
            })})



  router.post('/saveSchedules', (req, res) => {
    console.log('check schedule body')
    console.log(req.body)

    const placesClusters = req.body.placesClusters;
    const cityId = req.body.cityId;

    // create schedule instance in schedules table
    Promise.all(
      placesClusters.map((placesCluster) => {
        return db.query(`INSERT INTO schedules (city_id)
                          values ($1)
                          RETURNING *
                          `, 
                          [cityId]
                        )
                        
      })
    ).then(all => {
      scheduleIds = all.map(each => {
        return each.rows[0].id
      })
      console.log('scheduleIds')
      console.log(scheduleIds)
      
      //prepare for Promise all
      // combine place data with schedule id
      dbQuerysPrep =[]
      for (let i = 0; i < scheduleIds.length; i++) {
        const scheduleId = scheduleIds[i]
        for (let place of placesClusters[i]) {
          dbQuerysPrep.push({place: place, scheduleId: scheduleId})
        }
      }

      console.log('dbQuerysPrepafter')
      console.log(dbQuerysPrep)

      // resolve all dbquerys 
      Promise.all(
        dbQuerysPrep.map((each) => {
          return db.query(`UPDATE places 
                           SET schedule_id = $1
                           WHERE id = $2
                           `, [each.scheduleId, each.place.id]).catch(err => console.log(err))

        })
      ).then((response) => {
        //and then send back response
        res.send('schesuled')
      })
    })
  })


  return router;
};
