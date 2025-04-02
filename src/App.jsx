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
import UserReservedBook from "./pages/UserBookInfo/UserReservedBook";
import UserBorrowingBook from "./pages/UserBookInfo/UserBorrowingBook";
import UserRevertBook from "./pages/UserBookInfo/UserRevertBook";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/" element={<SearchBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findform" element={<Findform />} />

        {/* 보호된 라우트 - 로그인 필요 */}
        <Route
          path="/book_info"
          element={
            <ProtectedRoute>
              <BookInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservedBook"
          element={
            <ProtectedRoute>
              <UserReservedBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/borrowingBook"
          element={
            <ProtectedRoute>
              <UserBorrowingBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revertBook"
          element={
            <ProtectedRoute>
              <UserRevertBook />
            </ProtectedRoute>
          }
        />

        {/* 관리자 전용 라우트 */}
        <Route
          path="/book_manage"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <BookManage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book_admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <BookAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member_manage"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <MemberManage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book_edit"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <BookEdit />
            </ProtectedRoute>
          }
        />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
