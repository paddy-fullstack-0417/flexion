import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import store from './redux';
import SnackbarManager from './components/manager/SnackbarManager';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TeacherPanel from './components/panel/TeacherPanel';
import StudentPanel from './components/panel/StudentPanel';

import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <SnackbarManager />
            <SnackbarProvider>
                <Router>
                    <Routes>
                        <Route path='' element={<Layout />}>
                            <Route path='teacher-panel' element={<TeacherPanel />} />
                            <Route path='student-panel' element={<StudentPanel />} />
                            <Route path='*' element={<TeacherPanel />} />
                        </Route>
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Routes>
                </Router>
            </SnackbarProvider>
        </Provider >
    );
}

export default App;