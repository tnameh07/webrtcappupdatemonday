API end poins 


app.use('/user', UserRouter);
app.use('/meetings',MeetingRoutes );


User: 

post : http://localhost:3001/user/register 
post : http://localhost:3001/user/login


Meetings  : 
post :   http://localhost:3001/meetings/create        send this format : title, participants, startTime, endTime
get : http://localhost:3001/meetings/scheduled



