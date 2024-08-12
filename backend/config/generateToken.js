import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  try{
    
    const secret = process.env.JWT_SECRET;
  
    console.log(secret,payload);
  return jwt.sign(payload, secret);

  }catch(error){
    console.log("error in generattoken" , error.message);
    throw new Error
  }
  
};

export default generateToken;
