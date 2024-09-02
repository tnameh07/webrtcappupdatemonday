// import jwt, { decode } from 'jsonwebtoken';
// import User from '../model/UserModel.js';



//  const auth = async (req, res, next) => {
//   try {
//     console.log("aa gya auth ");
//     // const token = req.header('Authorization').replace('Bearer ', '');
//     const authHeader = req.headers['authorization'];
//     console.log(authHeader);
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
//   console.log(token);

//     console.log(" Tokent : ", token);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(" Decoded : ", decoded);
//     const user = await User.findOne({ _id: decoded.userId });
//     console.log(" user  : ", user);
//     if (!user) {
//       throw new Error();
//     }
//     req.token = token;
//     req.user = user;

//     console.log("next xamnvks");
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Please authenticate.' });
//   }
// };

// export default auth;
import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';

const auth = async (req, res, next) => {
    try {
        console.log("Auth middleware activated");
        const authHeader = req.headers['authorization'];
        console.log("Authorization Header:", authHeader);

        if (!authHeader) {
            throw new Error('No token provided');
        }

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const user = await User.findOne({ _id: decoded.userId });
        console.log("User:", user);

        if (!user) {
            throw new Error('User not found');
        }

        req.token = token;
        req.user = user;

        console.log("Proceeding to next middleware");
        next();
    } catch (error) {
        console.log("Authentication Error:", error.message);
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

export default auth;
