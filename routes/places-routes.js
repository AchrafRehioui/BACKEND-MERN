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
  const placeId = req.params.pid; // { pid: 'p1' }
  const place = D_PLACES.find(p => {
    return p.id === placeId;
  });
  res.json({place}); // => { place } => { place: place }
});

router.get('/user/:uid', (req, res, next) => {

  const userId = req.params.uid;

  const place = D_PLACES.find( p => {

    return p.creator === userId;
  });

  res.json({ place });
});

module.exports = router;