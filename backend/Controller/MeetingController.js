import Meeting from "../model/MeetingModel.js";
import  User from  '../model/UserModel.js'

export const createMeetings = async (req, res) => {
  try {   
    console.log("Checking body data:", req.body);
    const { title, participants, startTime, endTime, meetingLink } = req.body;
    console.log(`Title: ${title}, Participants: ${participants}, Start Time: ${startTime}, End Time: ${endTime}, Meeting Link: ${meetingLink}`);
    
    const meeting = new Meeting({
      title,
      organizer: req.user._id,
      participants,
      startTime,
      endTime,
      meetingLink
    });
    
    console.log("Meeting:", meeting);
    const result = await meeting.save();

    console.log("Result:", result);
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });       
  }
}
    
    

export const ScheduleMeetings =async (req, res) => {
  console.log("schedul meetings  : ", req.body);

  res.send("Status succes : " )
  // GET /api/meetings/user/:userId
  try {
    const userId = req.params.userId;

    // Validate that userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Find meetings where the user is either the organizer or a participant
    const meetings = await Meeting.find({
      $or: [
        { organizer: userId },
        { participants: userId }
      ]
    }).populate('organizer', 'name email') // Populate organizer details
      .populate('participants', 'name email'); // Populate participant details

    // Group meetings by the user's role
    const groupedMeetings = {
      organized: meetings.filter(meeting => meeting.organizer._id.toString() === userId),
      participating: meetings.filter(meeting => meeting.participants.some(p => p._id.toString() === userId))
    };

    res.json(groupedMeetings);
  } catch (error) {
    console.error('Error fetching user meetings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
    


export const validate = async (req, res) => {
  console.log("validating participants :");
  
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ isValid: true, userId: user._id });
    } else {
      res.json({ isValid: false });
    }
  } catch (error) {
    console.error('Error validating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
 



    
    
 
 