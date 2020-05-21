
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
  
  const getPlacesByUserId = (req, res, next) => {
  
    const userId = req.params.uid;
  
    const places = D_PLACES.filter( p => {
  
      return p.creator === userId;

    });
  
    if(!places || places.length === 0) {
  
     return next ( 
       new HttpError ('Could not find  places for user id. ', 404)
       );
      
    }
  
    res.json({ places });
  };

  const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
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
   
 const updatePlace = (req, res, next) => {

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace =  { ...D_PLACES.find( p => p.id  === placeId) };
  const placeIndex = D_PLACES.findIndex( p => p.id  === placeId);
  
  updatePlace.title = title;
  updatePlace.description = description;

  D_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({place: updatedPlace});

 }; 

const deletePlace = (req, res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
  