import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import BookAdmin from "./pages/Administrator/BookAdmin/BookAdmin";
import BookManage from "./pages/Administrator/BookManage/BookManage";
import MemberManage from "./pages/Administrator/MemberManage/MemberManage";
import SearchBook from "./pages/SearchBook/SearchBook";
import Login from "./pages/Login/Login_Page";
import SignUp from "./pages/SignUp/SignUp_Page";
import BookInfo from "./pages/BookInfo/BookInfo";
import Findform from "./pages/Findform/Findform";
import BookEdit from "./pages/Administrator/BookEdit/BookEdit";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBook />} />
        <Route path="/book_info" element={<BookInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/book_manage" element={<BookManage />} />
        <Route path="/book_admin" element={<BookAdmin />} />
        <Route path="/member_manage" element={<MemberManage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/findform" element={<Findform />} />
        <Route path="/book_edit" element={<BookEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
