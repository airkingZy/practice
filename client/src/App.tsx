import React from 'react';
// import logo from './logo.svg';
// import { Button } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/home';
import TestView from './view/testView';
import TestViewCopy from './view/testView copy';
import './app.less';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/home' element={<Home></Home>}></Route>
                    <Route path='/test' element={<TestView></TestView>}></Route>
                    <Route path='/test/abc' element={<TestViewCopy></TestViewCopy>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
