import generateToken from '../config/generateToken.js';
import User from '../models/User.js';

import {loginSchema,registrationSchema} from '../schemas/userSchema.js'


export async function register(req, res) {
  try {
    registrationSchema.parse(req.body);
    const { email, password, role,name } = req.body;
    console.log("registertoo")
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ email, password, role ,name});
    await newUser.save();
    console.log("registertoo")
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ errors: error.errors });
  }
}




export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect credentials' });
    }

    const token = generateToken({email,role:user.role});
    
    

    return res.status(200).json({ msg: 'Login successful' , token:token,user:{email:email,role:user.role,_id:user._id,classroom:user.classroom}});
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(400).json({ errors: error.message });
  }
}