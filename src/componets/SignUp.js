import React from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { auth, db, storage } from '../shared/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const id_ref = React.useRef(null)
    const name_ref = React.useRef(null)
    const pw_ref = React.useRef(null)
    const file_link_ref = React.useRef(null)
    const navigate = useNavigate()

    const signupFB = () => {
        //값이 전부 말짱해!! => 벨리데이션
        // 만약 공란 바로 리턴 폴스
        const user = createUserWithEmailAndPassword(
          auth,
          id_ref.current.value,
          pw_ref.current.value
        )
        
        console.log(user)
        
        // const user_doc = await addDoc(collection(db, 'users'), {
        //   user_id: user.user.email,
        //   name: name_ref.current?.value,
        //   image_url: file_link_ref.current?.url
        // })
    
        // console.log(user_doc.id)
      }

      const uploadFB = async (e) => {
        const uploaded_file = await uploadBytes(
          ref(storage, `images/${e.target.files[0].name}`),
          e.target.files[0]
          )
        
        console.log(uploaded_file)

        const file_url = await getDownloadURL(uploaded_file.ref)

        console.log(file_url)
        file_link_ref.current = { url: file_url }

      }

    return (
        <Container>
            <h1>회원가입 페이지</h1>
            <TextField id="standard-basic" label="아이디" variant="standard" ref={id_ref}/>
            <TextField id="standard-basic" label="비밀번호" variant="standard" ref={pw_ref}/>
            <TextField id="standard-basic" label="이름" variant="standard" ref={name_ref}/>
            <Button variant="contained" component="label">
                사진업로드
                <input hidden accept="image/*" multiple type="file" ref={file_link_ref} onChange={uploadFB}/>
            </Button>
            <Button variant="contained" onClick={signupFB}>회원가입</Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>취소</Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export default SignUp;