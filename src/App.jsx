import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import BookAdmin from "./pages/Administrator/BookAdmin/BookAdmin";
import BookManage from "./pages/Administrator/BookManage/BookManage";
import MemberManage from "./pages/Administrator/MemberManage/MemberManage";
import "./App.css";
import SearchBook from "./pages/SearchBook/SearchBook";
import Login from "./pages/Login/Login_Page";
import SignUp from "./pages/SignUp/SignUp_Page";
import BookInfo from "./pages/BookInfo/BookInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBook />} />
        <Route path="/book_info" element={<BookInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/book_manage" element={<BookManage />} />
        <Route path="/book_admin" element={<BookAdmin />} />
        <Route path="/member_manage" element={<MemberManage />} />
        <Route path="/main" element={<MainPage />} />
        {/* 나중에 다른 라우트가 필요할 때를 위해 주석 처리로 남겨둠 */}
        {/* <Route path="/admin" element={<BookAdmin />} />
        <Route path="/members" element={<MemberManage />} />
        <Route path="/main" element={<MainPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
