const User = required('../model/User');
const bcrypt = ('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '30'});
}

// Register a new user
const registerUser = async (req, res) => {
     const{name, email,password} = req.body;
     try{
        const existingUser = await User.findone({email});
       if(existingUser){
           return res.status(400).json({message:'User already exsits'});
        }

      const salt = await bcrypt.genSalt(10);   
      const hashedPassword = awaitbcrypt.hash(password,salt);

      const user = User.create({name, email, password: hashedPassword});
      if (user){
        const otp = Maths.floor(100000 + Math.random() * 900000).toString();

            const message = `
            Welcome to ShopNest, ${name}! Thank you for registration with us.
            Your OTP for ShopNest registration is: ${otp}`;
    
           await sendEmail(email,'Welcome to ShopNest - Your OTP for registration',message);

            res.status(201).json({
                 id: user._id,
                 name: user.name,
                 email:user.email,
                 role: user.role,
                 token: generateToken(user._id)
            })

        }else{
            res.status(400).json({message: 'Invalid user data'});
        }  
        res.status(201).json({
               messgae: 'User registered successfully. Please chek you email for the OTP.'
        });
      
     }catch(error){
        res.status(500).json({message: 'Server error'});
     }
};

// LOGIN USER
const loginUser = async(req,res) =>{
    const{email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user && (await bcrypt.Compare(password,User.password))) {
            res.json({
                _id: user_id,
                name: user.name,
                email: user.email,
                role:user.role,
                token: generateToken(user._id)
            });
        }else{
            res.status(400).json({message: 'Invalid email or pssword'});
        }
    }catch(error){
        res.status(500).json({message:'Server error'});
    }
};

const getUsers = async (req,res) => {
    try{
        const users = await User.find({}).select('-password');
        res.json(users);
    }catch(error) {
        res.status(500).json({message: 'Server error'});
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUsers
};
