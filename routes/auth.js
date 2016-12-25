import express from 'express';
import passport from 'passport';
import { Account, Auth, DevHelp } from '../controllers/user';

const router = express.Router();

// API data/auth/

// Local authentication

// User
router.route('/local/register')
  .post(Account.register);

router.route('/local/login')
  .post(passport.authenticate('user-local'), Auth.login);

router.route('/local/logout')
  .delete(Auth.logout);

router.route('/getAll')
  .get(DevHelp.getAll);

export default router;
