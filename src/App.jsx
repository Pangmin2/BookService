import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main/Main_Page';
import BookAdmin from './pages/Administrator/BookAdmin/BookAdmin';
import BookManage from './pages/Administrator/BookManage/BookManage';
import MemberManage from './pages/Administrator/MemberManage/MemberManage';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookManage />} />
        {/* 나중에 다른 라우트가 필요할 때를 위해 주석 처리로 남겨둠 */}
        {/* <Route path="/admin" element={<BookAdmin />} />
        <Route path="/members" element={<MemberManage />} />
        <Route path="/main" element={<MainPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
