import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeetingComponent.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const MeetingComponent = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('join'); // 'join' or 'create'
    const [name, setName] = useState('');
    // const [meetingId, setMeetingId] = useState('');
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [participants, setParticipants] = useState([]);
    // const [participantEmail, setParticipantEmail] = useState('');
    const [participantInput, setParticipantInput] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const handleJoinMeeting = () => {
        // Logic to join a meeting
        // alert(`Joining meeting with ID: ${meetingId}`);
         // Check if room ID and username are provided
    if (roomId.trim() && name.trim()) {
        // Redirect to the meeting room with roomID and username as query params
        navigate(`/room/${roomId}?username=${encodeURIComponent(name)}`);
      } else {
        alert("Please enter both room ID and username.");
      }
    };

    const validateAndAddParticipant = async () => {
        console.log("Validating participant:", participantInput);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("No token found, redirecting to login");
                navigate('/login');
                return;
            }

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meetings/users/validate?email=${participantInput}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Validation response:", response.data);
            if (response.data.isValid) {
                const newParticipant = { 
                    id: response.data.userId, 
                    email: participantInput 
                };
                console.log("Adding new participant:", newParticipant);
                setParticipants([...participants, newParticipant]);
                setParticipantInput('');
            } else {
                console.log("User not found in the system");
                setErrorMessage('User not found in the system.');
            }
        } catch (error) {
            console.error('Error validating user:', error);
            setErrorMessage('Error validating user');
            if (error.response?.status === 401) {
                console.log("Unauthorized, redirecting to login");
                navigate('/login');
            }
        }
    };
    const handleStartTimeChange = (e) => {
        const selectedStart = new Date(e.target.value);
        const now = new Date();
        
        console.log("Selected start time:", selectedStart);
        console.log("Current time:", now);

        if (selectedStart <= now) {
            console.log("Invalid start time: in the past");
            setErrorMessage('Start time must be in the future');
            setStartTime('');
        } else {
            console.log("Valid start time");
            setErrorMessage('');
            setStartTime(e.target.value);
            if (endTime && new Date(endTime) <= selectedStart) {
                console.log("Clearing end time as it's before new start time");
                setEndTime('');
            }
        }
    };

    const handleEndTimeChange = (e) => {
        const selectedEnd = new Date(e.target.value);
        const startDate = new Date(startTime);
        
        console.log("Selected end time:", selectedEnd);
        console.log("Start time:", startDate);

        if (selectedEnd <= startDate) {
            console.log("Invalid end time: before or equal to start time");
            setErrorMessage('End time must be after start time');
            setEndTime('');
        } else {
            console.log("Valid end time");
            setErrorMessage('');
            setEndTime(e.target.value);
        }
    };

    // const handleCreateMeeting = async () => {
    //     console.log("Creating meeting with data:", { title, startTime, endTime, participants });

    //     if (!startTime || !endTime) {
    //         console.log("Missing start or end time");
    //         setErrorMessage('Please set both start and end times');
    //         return;
    //     }

    //     const link = `https://example.com/meeting/${Date.now()}`; // Dummy link
    //     console.log("Generated meeting link:", link);
    //     setMeetingLink(link);

    //     const data = {
    //         title: title,
    //         startTime: new Date(startTime).toISOString(),
    //         endTime: new Date(endTime).toISOString(),
    //         participants: participants.map(p => ({ id: p.id, email: p.email }))
    //     };

    //     try {
    //         console.log("Sending data to server:", data);
    //         const token = localStorage.getItem('token');

    //         if (token) {
    //             const response = await axios.post(
    //                 `http://localhost:3001/meetings/create`,
    //                 data,
    //                 {
    //                     headers: { Authorization: `Bearer ${token}` }
    //                 }
    //             );

    //             console.log("Server response:", response.data);
    //             setView('join');
    //         } else {
    //             console.log("No token found, redirecting to login");
    //             navigate('/login');
    //         }
    //     } catch (err) {
    //         console.error("Error creating meeting:", err);
    //         if (err.response?.status === 401) {
    //             console.log("Unauthorized, redirecting to login");
    //             navigate('/login');
    //         } else {
    //             setErrorMessage('Failed to create meeting');
    //         }
    //     }
    // };


    // const addParticipant = () => {
    //     if (participantInput) {
    //         setParticipants([...participants, participantInput]);
    //         setParticipantInput('');
    //     }
    // };

    const handleCreateMeeting = async () => {
        console.log("Creating meeting with data:", { title, startTime, endTime, participants });
    //|| participants.length === 0
        if (!title || !startTime || !endTime ) {
            console.log("Missing required fields");
            setErrorMessage('Please fill in all required fields');
            return;
        }
    
        const meetingId = uuidv4();
        // const meetingLink = `https://example.com/meeting/${meetingId}`;
        console.log("Generated meeting link:", meetingId);
        setMeetingLink(meetingId);
    
        const data = {
            title: title,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            participants: participants.map(p => ({ id: p.id, email: p.email })),
            meetingLink: meetingId
        };
    
        try {
            console.log("Sending data to server:", data);
            const token = localStorage.getItem('token');
    
            if (!token) {
                console.log("No token found, redirecting to login");
                navigate('/login');
                return;
            }
    
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/meetings/create`,
                data,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
    
            console.log("Server response:", response.data);
            setView('join');
        } catch (err) {
            console.error("Error creating meeting:", err);
            if (err.response?.status === 401) {
                console.log("Unauthorized, redirecting to login");
                navigate('/login');
            } else {
                setErrorMessage('Failed to create meeting: ' + (err.response?.data?.error || err.message));
            }
        }
    };
    return (
        <div className="container mt-5">
            {view === 'join' ? (
                <div className="join-container">
                    <h2>Join a Meeting</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetingId">Meeting ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="meetingId"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleJoinMeeting}>
                            Join Meeting
                        </button>
                        <button type="button" className="btn btn-secondary ml-2" onClick={() => setView('create')}>
                            Create Meeting
                        </button>
                    </form>
                </div>
            ) : (
                <div className="create-container">
                <h2>Create a Meeting</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Meeting Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startTime">Start Time</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="startTime"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">End Time</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="endTime"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="participants">Participants</label>
                        <div className="d-flex">
                            <input
                                type="email"
                                className="form-control"
                                id="participants"
                                value={participantInput}
                                onChange={(e) => setParticipantInput(e.target.value)}
                                placeholder="Enter participant email"
                            />
                            <button type="button" className="btn btn-info ml-2" onClick={validateAndAddParticipant}>
                                Add
                            </button>
                        </div>
                        <ul className="list-group mt-2">
                            {participants.map((participant, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {participant.email}
                                    <button 
                                        type="button" 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => setParticipants(participants.filter((_, i) => i !== index))}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <button type="button" className="btn btn-success mt-3" onClick={handleCreateMeeting}>
                        Create Meeting
                    </button>
                    {meetingLink && (
                        <div className="alert alert-success mt-3" role="alert">
                            Meeting created successfully! <a href={meetingLink} target="_blank" rel="noopener noreferrer">Join here</a>
                        </div>
                    )}
                    <button type="button" className="btn btn-secondary mt-3" onClick={() => setView('join')}>
                        Back to Join Meeting
                    </button>
                </form>
            </div>
            )}
        </div>
    );
};

export default MeetingComponent;

/* <div className="create-container">           
                    <h2>Create a Meeting</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Meeting Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">Start Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endTime">End Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="participants">Participants</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="participants"
                                    value={participantInput}
                                    onChange={(e) => setParticipantInput(e.target.value)}
                                />
                                <button type="button" className="btn btn-info ml-2" onClick={addParticipant}>
                                    Add
                                </button>
                            </div>
                            <ul className="list-group mt-2">
                                {participants.map((participant, index) => (
                                    <li key={index} className="list-group-item">
                                        {participant}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type="button" className="btn btn-success mt-3" onClick={handleCreateMeeting}>
                            Create Meeting
                        </button>
                        {meetingLink && (
                            <div className="alert alert-success mt-3" role="alert">
                                Meeting created successfully! <a href={meetingLink} target="_blank" rel="noopener noreferrer">Join here</a>
                            </div>
                        )}
                        <button type="button" className="btn btn-secondary mt-3" onClick={() => setView('join')}>
                            Back to Join Meeting
                        </button>
                    </form>
                </div> */