import User from "../model/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// User Registration
export const ragistration = async (req, res) => {
  try {

    console.log( " DAta comming from fromntend  signup", req.body);
    const { username, email, password } = req.body;

    console.log(`name ${username }, email ${email}, password : ${password}`);
    const user = new User({ username, email, password });
    console.log("user  :", user);
   const result =  await user.save();
   console.log("result : ", result);
    res.status(201).json({ user });
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const Login = async (req, res) => {
  try {

    console.log( " DAta comming from fromntend fro login ", req.body);
    const { username, email, password } = req.body;
    console.log(` email : ${email }, password : ${password}`);
    const user = await User.findOne({ email });
    console.log(" found user : ", user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid login credentialsInvalid email passward');
    }
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   
     console.log("done  : token :", token , "  ");
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
