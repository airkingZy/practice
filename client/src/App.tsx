import React from 'react';
// import logo from './logo.svg';
// import { Button } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/home';
import Maps from './view/maps';
import './app.less';

function App() {
    return (
        <div className='App w-screen h-screen'>
            <div className='h-5 bg-slate-50 shadow-md header'></div>
            <div className='content'>
                <div className='w-full h-full'>
                    <div className='home—wrap w-full h-full'>
                        <div className='left-wrap'>1</div>
                        <div className='middle-wrap p-6' id="middle-wrap'">
                            <Router>
                                <Routes>
                                    <Route path='/' element={<Home></Home>}></Route>
                                    <Route path='/home' element={<Home></Home>}></Route>
                                    <Route path='/maps' element={<Maps></Maps>}></Route>
                                </Routes>
                            </Router>
                        </div>
                        <div className='right-wrap'>3</div>
                    </div>
                </div>
            </div>
            <div className='h-5 bg-slate-50 shadow-md footer'></div>
        </div>
    );
}

export default App;
