// Meeting Schema
import mongoose from "mongoose";
const MeetingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    participants: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      email: String
    }],
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    meetingLink: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  

  // Create models
const Meeting = mongoose.model('Meeting', MeetingSchema);

export default Meeting;
