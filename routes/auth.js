import express from 'express'
import { Account, Auth, DevHelp } from '../controllers/user';

const router = express.Router();

// API data/auth/

// Local authentication

// User
router.route('/local/register')
  .post(Account.register);

router.route('/getAll')
  .get(DevHelp.getAll);

export default router;
