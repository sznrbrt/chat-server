import express from 'express';
import User from '../models/User';
import { Account, DevHelp } from '../controllers/user';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();

// API data/user/

router.route('/profile')
  .get(AuthMiddleware.isLoggedIn, AuthMiddleware.isAuthorized('user'), Account.getProfile)

// only for development
router.route('/all')
        .get(DevHelp.getAll)

export default router;
