const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");




router.post("/register", async (req, res) => {

const { fname, email, password, cpassword } = req.body;

if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" })
}

try {

    const preuser = await userdb.findOne({ email: email });

    if (preuser) {
        res.status(422).json({ error: "This Email is Already Exist" })
    } else if (password !== cpassword) {
        res.status(422).json({ error: "Password and Confirm Password Not Match" })
    } else {
        const finalUser = new userdb({
            fname, email, password, cpassword
        });

        

        const storeData = await finalUser.save();

        
        res.status(201).json({ status: 201, storeData })
    }

} catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
}
});



router.post("/login", async (req, res) => {
    

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});
       
        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);
            

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
                
            }
            else{

                
                const token = await userValid.generateAuthtoken();
                
                
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
                
            }
        }


    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});


router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
  });





module.exports = router;
