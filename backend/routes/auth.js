
import express from 'express'
import { register,login } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/getlogin",(req,res)=>{
    console.log("getlogin"),
    res.send('lgin')
})
export default router;
