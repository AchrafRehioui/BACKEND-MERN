
const uuid = require('uuid/v4');

const HttpError = require ('../models/http-error');

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
  
  const getPlaceById = (req, res, next) => {
  
    const placeId = req.params.pid; 
  
    const place = D_PLACES.find(p => {
  
      return p.id === placeId;
  
    });
     if(!place) {
  
       throw new HttpError('Could not find a place for the id giving', 404);
  
     }
  
    res.json({ place }); 
  
  };
  
  const getPlaceByUserId = (req, res, next) => {
  
    const userId = req.params.uid;
  
    const place = D_PLACES.find( p => {
  
      return p.creator === userId;
    });
  
    if(!place) {
  
     return next ( 
       new HttpError ('Could not find a place for user id. ', 404)
       );
      
    }
  
    res.json({ place });
  };

  const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createPlace = {
      id: uuid(),
      title,
      description,
      location: coordinates,
      address,
      creator
    };
    D_PLACES.push(createdPlace);
    res.status(201).json({place: createdPlace});

  };

  exports.getPlaceById = getPlaceById;
  exports.getPlaceByUserId = getPlaceByUserId;
  exports.createPlace = createPlace;
  