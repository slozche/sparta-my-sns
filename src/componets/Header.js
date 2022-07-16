import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    
    return (
        <div>
            <button onClick={navigate('/')}>메인</button>
            <button onClick={navigate('/signup')}>회원가입</button>
            <button onClick={navigate('/login')}>로그인</button>
            <button onClick={navigate('/detail')}>디테일</button>
            <button onClick={navigate('/write')}>게시글 작성</button>
        </div>
    );
};

export default Header;