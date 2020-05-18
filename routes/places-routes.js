const express = require('express');

const router = express.Router();

const D_PLACES = [
  {
    id: 'p1',
    title: 'Test',
    description: 'Test',
    location: {
      lat: 40,
      lng: -73
    },
    address: 'Test',
    creator: 'u1'
  }
];

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid; 

  const place = D_PLACES.find(p => {

    return p.id === placeId;

  });
   if(!place) {

     const error = new Error ('Could not find a place for the id giving');
     error.code = 404;
     throw error;

   }

  res.json({ place }); 

});

router.get('/user/:uid', (req, res, next) => {

  const userId = req.params.uid;

  const place = D_PLACES.find( p => {

    return p.creator === userId;
  });

  if(!place) {
    
    const error = new Error ('Could not find a place for user id. ');
    error.code = 404;
    return next(error);

  }

  res.json({ place });
});

module.exports = router;