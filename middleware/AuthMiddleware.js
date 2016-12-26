import User from '../models/User';

class Auth {
  static isAuthorized(role) {
    return (req, res, next) => {
      if(!req.user) return res.status(403).send({ err: 'Unauthorized action!' });
      if(role !== req.user.role) return res.status(400).send({ err: 'Unauthorized action!' });
      next();
    }
  }

  static isLoggedIn(req, res, next) {
    if(!req.user) return res.status(403).send({ err: 'Not logged in!' });
    next();
  }

  static userExist(req, res, next) {
    if(!req.user) return res.status(403).send({ err: 'No user.'})
    next();
  }
}


export default Auth;
