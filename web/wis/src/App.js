// src/App.js
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import R1 from './pages/routing1';
import R2 from './pages/routing2';
import R3 from './pages/routing3';
import R4 from './pages/routing4';
import "./styles.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/r1" element={<R1 />} />
            <Route path="/r2" element={<R2 />} />
            <Route path="/r3" element={<R3 />} />
            <Route path="/r4" element={<R4 />} />
        </Routes>
    );
}

export default App;