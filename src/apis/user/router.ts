import express, {Request, Response} from 'express';
import User from './model';
import { GetAllUsers, InsertUser , GetSingleUser, DeleteUser, SigninUser } from './controller';
import { GET_ALL_USERS, SIGNIN_USERS } from '../../utils/constants';

const router = express.Router();

router.get(GET_ALL_USERS, GetAllUsers );
router.post(SIGNIN_USERS, SigninUser );
router.post(GET_ALL_USERS, InsertUser );
router.post(`${GET_ALL_USERS}/:id`, GetSingleUser );
router.delete(`${GET_ALL_USERS}/:id`, DeleteUser );

// router.post("/user", async (req: Request, res: Response) => {
//     try {
//         const user = new User(req.body);
//         const saveUser = await user.save();
//         return res.status(200).send(saveUser);
//     } catch (error) {
//         res.status(500).send({"message": error});
//     }
// });

export { router as userRouter };