import express from 'express';
import useValidateToken from '../middleware/useValidateToken';
import useValidateUserRequest from '../middleware/useValidateUserRequest';

const router = express.Router();

/*
 * "/auth"
*/
import * as Auth from './auth';

router.post('/auth/signin', useValidateUserRequest, Auth.signin);
router.post('/auth/signup', useValidateUserRequest, Auth.signup);

/* 
 *  "/users" 
*/
import * as Users from './users';

router.get('/users', useValidateToken, Users.get);
router.get('/users/:id', useValidateToken, Users.getById);

export default router;