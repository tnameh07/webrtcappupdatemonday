import express from 'express';
import UserRouter from './Routes/user.router.js'
import MeetingRoutes from './Routes/Meetings.routes.js'
import dbConfig from './db/db.config.js';
import config from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser';



config.config();
const app = express();
const port = process.env.port || 3001

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/user', UserRouter);
app.use('/meetings',MeetingRoutes );

app.get('/', (req , res) =>{
    res.status(200).json({mesage : "working perfectly fine "})
})

dbConfig().then(e => console.log("connected with database "))
.catch(e => console.log("fail to conntect database :", e))

app.listen(port, ()=>{
    console.log(`backend server runiing on port http://localhost:${port} `);
  
})