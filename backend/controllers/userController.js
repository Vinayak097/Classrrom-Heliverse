import User from "../models/User.js";



export async function getUsers(req, res) {
  const users = await User.find();
  res.status(200).json(users);
}

export async function updateUser(req, res) {
  try{
    const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return res.status(200).json(user);

  }catch(e){
    console.log(e.message , " error");
    return res.status(401).json({error:e,message:"Internal server error"});

  }
  
}

export async function deleteUser(req, res) {
  try{
    const { id } = req.params;
    await User.findByIdAndDelete(id);
  return res.status(200).json({message:"deleted succussfully"});

  }catch(e){
    console.log(e.message , " error");
    return res.status(401).json({error:e,message:"Internal server error"});

  }
  
}
