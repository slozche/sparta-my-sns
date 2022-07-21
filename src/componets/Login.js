import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../shared/firebase';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { async } from '@firebase/util';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = React.useState(null)
    const [pw, setPw] = React.useState(null)
    const navigate = useNavigate()

    const loginFB = async () => {
        const user = await signInWithEmailAndPassword(
            auth,
            id,
            pw
            )
        
    const user_docs = await getDocs(query(
        collection(db, 'users'), where('user_id', '==', user.user.email)
    ))

    user_docs.forEach(item => console.log(item.data()))
    }

    useEffect(() => {
        const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                const email = user.email
            } else {
                // User is signed out
                // ...
            }})
    }, [])
    return (
        <Container>
            <h1>로그인페이지</h1>
            <TextField id="standard-basic" label="아이디" variant="standard" onChange={e => setId(e.target.value)}/>
            <TextField id="standard-basic" label="비밀번호" variant="standard" onChange={e => setPw(e.target.value)}/>
            <Button variant="contained" onClick={loginFB}>로그인</Button>
            <Button variant="outlined" onClick={() => navigate('/signup')}>회원가입</Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export default Login;