import e from "express";
const router=e.Router()

router('/principal',(req,res)=>{
    
    res.send({message:"helo"})
})

export default router;

