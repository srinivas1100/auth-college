import express from 'express';
import { getAllUsers, insertUser , getSingleUser, deleteUser, signinUser } from './controller';
import { GET_ALL_USERS, SIGNIN_USERS } from '../../utils/constants';

const router = express.Router();

router.get(GET_ALL_USERS, getAllUsers );
router.post(SIGNIN_USERS, signinUser );
router.post(GET_ALL_USERS, insertUser );
router.post(`${GET_ALL_USERS}/:id`, getSingleUser );
router.delete(`${GET_ALL_USERS}/:id`, deleteUser );

export { router as userRouter };