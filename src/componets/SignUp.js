import React from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { auth, db, storage } from '../shared/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [id, setId] = React.useState(null)
    const [pw, setPw] = React.useState(null)
    const [name, setName] = React.useState(null)
    const file_link_ref = React.useRef(null)
    const navigate = useNavigate()

    const signupFB = async () => {
        //값이 전부 말짱해!! => 벨리데이션
        // 만약 공란 바로 리턴 폴스
        const user = await createUserWithEmailAndPassword(
          auth,
          id,
          pw
        )

        const user_doc = await addDoc(collection(db, 'users'), {
          user_id: user.user.email,
          name: name,
          image_url: file_link_ref.current?.url
        })
    
        console.log(user_doc.id)
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
            <TextField id="standard-basic" label="아이디" variant="standard" onChange={e => setId(e.target.value)}/>
            <TextField id="standard-basic" label="비밀번호" variant="standard" onChange={e => setPw(e.target.value)}/>
            <TextField id="standard-basic" label="이름" variant="standard" onChange={e => setName(e.target.value)}/>
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