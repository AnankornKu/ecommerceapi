const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const jwt = require('jsonwebtoken');


//REGISTER

router.post("/register",async(req,res)=>{

   
    
const hashpassword = await bcrypt.hash(req.body.password,10);

const newUser = new User({

    username: req.body.username,
    email: req.body.email,
    password:hashpassword,
})

try {
    const savedUser = await newUser.save()
   res.status(201).json(savedUser)
} catch (error) {
    res.status(500).json(error)
}


})



//LOGIN

router.post('/login',async(req,res)=>{
try { 
   
    const user = await User.findOne({username:req.body.username})
    if(user)
        {
            const isValid =  await bcrypt.compare(req.body.password,user.password) 

            if(isValid)
            {
                const {password,...others} = user._doc;
                //if valid -> create session
                const accessToken = jwt.sign({
                    id:user._id, 
                    isAdmin:user.isAdmin,

                },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
            );
                res.status(200).json({...others,accessToken})
            }
            else
            {
                res.status(401).json("Wrong Credential!!!")
            }
        }
    else{
        res.status(401).json("Wrong Credential!!!")

    }

  
    
} catch (err) {
    res.status(500).json(err)
}
   
})



module.exports = router;
