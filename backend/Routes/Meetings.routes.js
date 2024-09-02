import express from 'express'
import { createMeetings  ,ScheduleMeetings ,validate} from '../Controller/MeetingController.js'
import auth from '../middilware/authentication.js';


const router = express.Router();
// const meetingController = require('../controllers/meetingController');
// const auth = require('../middleware/auth');

router.post('/create', auth ,  createMeetings);
router.get('/user/:userId',auth,  ScheduleMeetings)

router.get('/users/validate',auth,validate);

export default router;
    
    