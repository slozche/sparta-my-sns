import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './componets/Main';
import Login from './componets/Login';
import SignUp from './componets/SignUp';
import Write from './componets/Write';
import Detail from './componets/Detail';
import Header from './componets/Header';

function App() {
  return (
    <div className="App">
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
