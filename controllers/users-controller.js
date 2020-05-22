const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');


const D_USERS = [
    {
      id: 'u1',
      name: 'Test',
      email: 'Test@test.com',
      password: 'testers'
    }
  ];
  
  const getUsers = (req, res, next) => {
    res.json({ users: D_USERS });
  };
  
  const signup = (req, res, next) => {
    const { name, email, password } = req.body;
  
    const hasUser = D_USERS.find(u => u.email === email);
    if (hasUser) {
      throw new HttpError('Could not create user, email already exists.', 422);
    }
  
    const createdUser = {
      id: uuid(),
      name, // name: name
      email,
      password
    };
  
    D_USERS.push(createdUser);
  
    res.status(201).json({user: createdUser});
  };
  
  const login = (req, res, next) => {
    const { email, password } = req.body;
  
    const identifiedUser = D_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
      throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
    }
  
    res.json({message: 'Logged in!'});
  };
  
  exports.getUsers = getUsers;
  exports.signup = signup;
  exports.login = login;
  