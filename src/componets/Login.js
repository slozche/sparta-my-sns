import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../shared/firebase';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { async } from '@firebase/util';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';

const Login = () => {
    const id_ref = useRef(null)
    const pw_ref = useRef(null)

    const loginFB = async () => {
        const user = await signInWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
            )
        
    const user_docs = await getDocs(query(
        collection(db, 'users'), where('user_id', '==', user.user.email)
    ))

    user_docs.forEach(item => console.log(item.data()))
    }

    return (
        <Container>
            <h1>로그인페이지</h1>
            <TextField id="standard-basic" label="아이디" variant="standard" ref={id_ref}/>
            <TextField id="standard-basic" label="아이디" variant="standard" ref={pw_ref}/>
            <Button variant="contained" onClick={loginFB}>로그인</Button>
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