
import './App.css';
import {  Route , Routes } from 'react-router-dom';
import Homepage from './userinterface/Homepage';
import Room from './userinterface/Room';
import Chat from './components/chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './userinterface/Signin.js';
import Signup from './userinterface/Signup.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MeetingComponent from './userinterface/MeetingComponent.js';
import Navigationpage from './userinterface/Navigationpage.js';
import { AuthProvider } from './providers/AuthContext.js';



function App() {
 
  return (
    <AuthProvider>
    <div className="App">
      <Navigationpage/>
       <Routes>
      <Route path='/back' element={<Homepage/>} /> 
      <Route path='/' element={<MeetingComponent/>} /> 
      <Route path='/room/:id' element={<Room/>} /> 
      <Route path='/chat' element={<Chat/>} /> 
      <Route path='/ragistration' element={<Signup/>} /> 
      <Route path='/login' element={<Signin/>} /> 

      </Routes>
   
    </div>
    </AuthProvider>
  );
}

export default App;
