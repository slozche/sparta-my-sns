import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { auth, db } from './shared/firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from 'styled-components';

import Main from './componets/Main';
import Login from './componets/Login';
import SignUp from './componets/SignUp';
import Write from './componets/Write';
import Detail from './componets/Detail';
import Header from './componets/Header';

function App() {
  const [is_login, setis_login] = React.useState(false)
  const navigate = useNavigate()
  console.log(auth.currentUser)
  
  const loginCheck = async (user) => {
    if (user) {
      setis_login(true)
    } else {
      setis_login(false)
    }
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck)
  }, [])
  
  return (
    <div className="App">
      <ul>
          
          <IconButton aria-label="signup" onClick={() => navigate('/')}>
            <HomeIcon />
          </IconButton>
          {is_login ? 
          <IconButton aria-label="login" onClick={() => signOut(auth)}>
          로그아웃
        </IconButton> :
        <IconButton aria-label="login" onClick={() => navigate('/login')}>
            <LoginIcon />
      </IconButton>
          }
      </ul>
        
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/write' element={<Write/>}></Route>
          <Route path='/detail' element={<Detail/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
